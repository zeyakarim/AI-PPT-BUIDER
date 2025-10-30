import { useState } from 'react';
import { MobileHeader } from './sections/MobileHeader';
import { DesktopSidebar } from './sections/DesktopSidebar';
import { MainContent } from './sections/MainContent';
import { SignInModal } from './components/SignInModal';

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen bg-white font-sans text-base text-black">
      <div className="flex h-screen">
        <MobileHeader />
        <DesktopSidebar />
        <MainContent />
      </div>

      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={closeModal}
          />
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