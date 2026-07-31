import React, { Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { BoshSahifa } from './components/BoshSahifa';
import { PazandaAI } from './components/PazandaAI';

import { PaymentModal } from './components/PaymentModal';
import { RewardModal } from './components/RewardModal';
import { DynamicIslandTimer } from './components/DynamicIslandTimer';

// Code-splitting via React.lazy for instant initial load on Telegram WebViews
const Lifehacklar = lazy(() => import('./components/Lifehacklar').then(m => ({ default: m.Lifehacklar })));
const Profil = lazy(() => import('./components/Profil').then(m => ({ default: m.Profil })));
const AdminPanel = lazy(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));

const ComponentLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-7 h-7 border-3 border-[#DB2777] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedRecipeModal,
    setSelectedRecipeModal,
    selectedLifehackId,
    setSelectedLifehackId,
    showPaymentModal,
    setShowPaymentModal,
    selectedFolderCategory,
    searchQuery,
    timeFilter,
    diffFilter,
    resetPazandaFilters
  } = useApp();

  // Telegram WebApp BackButton & Hardware Back Button navigation listener
  React.useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    const backButton = tg?.BackButton;

    const hasOpenModal = !!selectedRecipeModal || !!selectedLifehackId || showPaymentModal;
    const hasPazandaSubNav = activeTab === 'pazanda' && (selectedFolderCategory !== null || searchQuery.trim() !== '' || timeFilter !== 'all' || diffFilter !== 'all');
    const isNotHome = activeTab !== 'home';
    const shouldShowBack = hasOpenModal || hasPazandaSubNav || isNotHome;

    const handleBackAction = () => {
      if (selectedRecipeModal) {
        setSelectedRecipeModal(null);
      } else if (selectedLifehackId) {
        setSelectedLifehackId(null);
      } else if (showPaymentModal) {
        setShowPaymentModal(false);
      } else if (hasPazandaSubNav) {
        resetPazandaFilters();
      } else if (activeTab !== 'home') {
        setActiveTab('home');
      }
    };

    if (shouldShowBack) {
      if (backButton && typeof backButton.show === 'function') {
        backButton.show();
        if (typeof backButton.onClick === 'function') {
          backButton.onClick(handleBackAction);
        }
      }
      try {
        window.history.pushState({ tab: activeTab, modal: hasOpenModal, subNav: hasPazandaSubNav }, '');
      } catch (err) {}
    } else {
      if (backButton && typeof backButton.hide === 'function') {
        backButton.hide();
      }
    }

    const handlePopState = (e: PopStateEvent) => {
      if (shouldShowBack) {
        handleBackAction();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      if (backButton && typeof backButton.offClick === 'function') {
        try {
          backButton.offClick(handleBackAction);
        } catch (err) {}
      }
      window.removeEventListener('popstate', handlePopState);
    };
  }, [
    activeTab,
    selectedRecipeModal,
    selectedLifehackId,
    showPaymentModal,
    selectedFolderCategory,
    searchQuery,
    timeFilter,
    diffFilter,
    setActiveTab,
    setSelectedRecipeModal,
    setSelectedLifehackId,
    setShowPaymentModal,
    resetPazandaFilters
  ]);


  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#2E121D] font-sans antialiased selection:bg-[#DB2777]/20">
      
      {/* Dynamic Island Kitchen Timer */}
      <DynamicIslandTimer />

      {/* Container wrapper constrained for mobile / desktop layout */}
      <div className="max-w-md mx-auto min-h-screen bg-[#FDF2F7] shadow-xl border-x border-[#FCE7F3] flex flex-col relative overflow-x-hidden">
        
        {/* Sticky Header */}
        <Header />

        {/* Main View Area based on Active Tab */}
        <main className="flex-1 px-4 pt-3">
          <Suspense fallback={<ComponentLoader />}>
            {activeTab === 'home' && <BoshSahifa />}
            {activeTab === 'pazanda' && <PazandaAI />}
            {activeTab === 'lifehacklar' && <Lifehacklar />}
            {activeTab === 'profil' && <Profil />}
            {activeTab === 'admin' && <AdminPanel />}
          </Suspense>
        </main>

        {/* Fixed Mobile Bottom Bar */}
        <BottomNav />

        {/* Global Modals */}
        <PaymentModal />
        <RewardModal />

      </div>
    </div>
  );
};


export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

