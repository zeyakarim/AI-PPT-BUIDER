// src/App.tsx
import React, { useState } from 'react';
import { MobileHeader } from './sections/MobileHeader';
import { DesktopSidebar } from './sections/DesktopSidebar';
import { MainContent } from './sections/MainContent';
import { SignInModal } from './components/SignInModal';

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen bg-white font-sans text-base text-black">
      {/* Page layout */}
      <div className="flex h-screen">
        <MobileHeader />
        <DesktopSidebar />
        <MainContent />
      </div>

      {/* ------------------- MODAL OVERLAY ------------------- */}
      {isModalOpen && (
        <>
          {/* 1. Dark backdrop – click anywhere on it to close */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={closeModal}
          />

          {/* 2. Modal container – stop propagation so clicks inside stay inside */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SignInModal onClose={closeModal} />
          </div>
        </>
      )}
    </div>
  );
};