'use client';

import React, { createContext, useContext, useRef } from 'react';
import { Settings } from './settings';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
    const SettingsRef = useRef(new Settings());

    return (
        <SettingsContext.Provider value={SettingsRef.current}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
