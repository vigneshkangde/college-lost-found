import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ITEMS, INITIAL_CLAIMS } from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const ItemContext = createContext(null);

export function ItemProvider({ children }) {
  // Initialize from localStorage or fallback to mock data
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('college_lf_items');
      return saved ? JSON.parse(saved) : INITIAL_ITEMS;
    } catch {
      return INITIAL_ITEMS;
    }
  });

  const [claims, setClaims] = useState(() => {
    try {
      const saved = localStorage.getItem('college_lf_claims');
      return saved ? JSON.parse(saved) : INITIAL_CLAIMS;
    } catch {
      return INITIAL_CLAIMS;
    }
  });

  // Current authenticated mock student session
  const [currentUser, setCurrentUser] = useState({
    id: 'usr-101',
    name: 'Alex Smith',
    email: 'alex.smith@college.edu',
    studentId: 'ST-2024-8841',
    role: 'student', // 'student' | 'admin'
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    const loadItems = async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Could not load items from Supabase:', error.message);
        return;
      }

      const mappedItems = data.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        type: row.item_type,
        category: row.category,
        location: row.location,
        date: row.item_date,
        imageUrl: row.image_url,
        contactEmail: row.contact_email,
        reporterName: row.contact_name,
        status: row.status,
        createdAt: row.created_at,
        matchedWith: []
      }));

      setItems(mappedItems);
    };

    loadItems();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('college_lf_items', JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save items to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('college_lf_claims', JSON.stringify(claims));
    } catch (e) {
      console.warn('Could not save claims to localStorage', e);
    }
  }, [claims]);

  // Actions structured like future Supabase calls
  const addItem = (itemData) => {
    const newItem = {
      id: `item-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: itemData.type, // 'lost' or 'found'
      reporterName: currentUser ? currentUser.name : 'Campus Student',
      contactEmail: currentUser ? currentUser.email : 'student@college.edu',
      studentId: currentUser ? currentUser.studentId : 'ST-XXXX-0000',
      matchedWith: [],
      ...itemData
    };

    setItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const getItemById = (id) => {
    return items.find((item) => String(item.id) === String(id));
  };

  const claimItem = (itemId, claimData) => {
    const targetItem = getItemById(itemId);
    const newClaim = {
      id: `claim-${Date.now()}`,
      itemId,
      itemTitle: targetItem ? targetItem.title : 'Campus Item',
      claimantName: currentUser?.name || claimData.claimantName || 'Alex Smith',
      claimantEmail: currentUser?.email || claimData.claimantEmail || 'alex.smith@college.edu',
      studentId: currentUser?.studentId || claimData.studentId || 'ST-2024-8841',
      claimDate: new Date().toISOString().split('T')[0],
      proofDescription: claimData.proofDescription || '',
      status: 'Under Review by Security',
      pickupInstructions: 'Awaiting review from campus security team.'
    };

    setClaims((prev) => [newClaim, ...prev]);

    // Update item status
    setItems((prev) =>
      prev.map((item) =>
        String(item.id) === String(itemId)
          ? { ...item, status: 'claimed' }
          : item
      )
    );

    return newClaim;
  };

  const updateItemStatus = (itemId, newStatus) => {
    setItems((prev) =>
      prev.map((item) =>
        String(item.id) === String(itemId) ? { ...item, status: newStatus } : item
      )
    );
  };

  const updateClaimStatus = (claimId, newStatus, instructions) => {
    setClaims((prev) =>
      prev.map((claim) =>
        String(claim.id) === String(claimId)
          ? { ...claim, status: newStatus, pickupInstructions: instructions || claim.pickupInstructions }
          : claim
      )
    );
  };

  const switchUserRole = (role) => {
    setCurrentUser((prev) => ({
      ...prev,
      role,
      name: role === 'admin' ? 'Officer Daniels (Campus Safety)' : 'Alex Smith',
      email: role === 'admin' ? 'security.admin@college.edu' : 'alex.smith@college.edu'
    }));
  };

  // Find match suggestions based on category or location similarity
  const getMatchSuggestions = (targetItem) => {
    if (!targetItem) return [];
    return items.filter((item) => {
      if (item.id === targetItem.id) return false;
      const oppositeType = targetItem.type === 'lost' ? 'found' : 'lost';
      const isOpposite = item.type === oppositeType;
      const isSameCategory = item.category === targetItem.category;
      return isOpposite && isSameCategory;
    });
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        claims,
        currentUser,
        addItem,
        getItemById,
        claimItem,
        updateItemStatus,
        updateClaimStatus,
        switchUserRole,
        getMatchSuggestions
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
}
