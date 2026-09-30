import React, { useState, useMemo } from 'react';
import {
  Crown,
  Users,
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Check,
  X,
  Search,
  AlertTriangle,
  Sparkles,
  Save,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useChurch } from '../../context/ChurchContext';
import { ProgramItem, SubItem } from '../../data/consecrationData';

type ServiceType = 'consecration' | 'pastors';

export const ProgramLineupManager: React.FC = () => {
  const {
    consecrationTitle,
    consecrationSubtitle,
    consecrationProgram,
    pastorsOrdinationTitle,
    pastorsOrdinationSubtitle,
    pastorOrdinationProgram,
    updateConsecrationTitles,
    updatePastorsOrdinationTitles,
    addProgramItem,
    updateProgramItem,
    deleteProgramItem,
    moveProgramItem,
    resetProgramToDefaults,
  } = useChurch();

  const [activeService, setActiveService] = useState<ServiceType>('consecration');
  const [searchQuery, setSearchQuery] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Title & Subtitle editing state
  const isConsecration = activeService === 'consecration';
  const currentTitle = isConsecration ? consecrationTitle : pastorsOrdinationTitle;
  const currentSubtitle = isConsecration ? consecrationSubtitle : pastorsOrdinationSubtitle;

  const [editingTitles, setEditingTitles] = useState(false);
  const [titleInput, setTitleInput] = useState(currentTitle);
  const [subtitleInput, setSubtitleInput] = useState(currentSubtitle);

  // Sync title inputs when service tab switches
  const handleServiceTabChange = (service: ServiceType) => {
    setActiveService(service);
    setSearchQuery('');
    setEditingTitles(false);
    if (service === 'consecration') {
      setTitleInput(consecrationTitle);
      setSubtitleInput(consecrationSubtitle);
    } else {
      setTitleInput(pastorsOrdinationTitle);
      setSubtitleInput(pastorsOrdinationSubtitle);
    }
  };

  const showToast = (message: string) => {
    setSuccessToast(message);
    setTimeout(() => {
      setSuccessToast(null);
    }, 3000);
  };

  // Save Service Title & Subtitle
  const handleSaveTitles = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;
    if (isConsecration) {
      await updateConsecrationTitles(titleInput.trim(), subtitleInput.trim());
    } else {
      await updatePastorsOrdinationTitles(titleInput.trim(), subtitleInput.trim());
    }
    setEditingTitles(false);
    showToast('Service titles updated and live on attendee page!');
  };

  // Program Items Modal State (for Add / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProgramItem | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formLeader, setFormLeader] = useState('');
  const [formSectionHeader, setFormSectionHeader] = useState('');
  const [formSubItems, setFormSubItems] = useState<SubItem[]>([]);

  // Item Delete Confirmation State
  const [deletingItem, setDeletingItem] = useState<ProgramItem | null>(null);

  // Reset to Defaults Confirmation State
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Active items list
  const activeItems = useMemo(() => {
    return isConsecration ? consecrationProgram : pastorOrdinationProgram;
  }, [isConsecration, consecrationProgram, pastorOrdinationProgram]);

  // Filtered items list
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return activeItems;
    const q = searchQuery.toLowerCase();
    return activeItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.leader?.toLowerCase().includes(q) ||
        item.sectionHeader?.toLowerCase().includes(q) ||
        item.subItems?.some((sub) => sub.text.toLowerCase().includes(q) || sub.letter.toLowerCase().includes(q))
    );
  }, [activeItems, searchQuery]);

  // Open modal for adding
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormLeader('');
    setFormSectionHeader('');
    setFormSubItems([]);
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (item: ProgramItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormLeader(item.leader || '');
    setFormSectionHeader(item.sectionHeader || '');
    setFormSubItems(item.subItems ? [...item.subItems] : []);
    setIsModalOpen(true);
  };

  // Sub-items management in modal
  const handleAddSubItem = () => {
    // Generate next letter (a, b, c, ... z)
    const nextCode = 97 + formSubItems.length;
    const nextLetter = nextCode <= 122 ? String.fromCharCode(nextCode) : `${formSubItems.length + 1}`;
    setFormSubItems([...formSubItems, { letter: nextLetter, text: '' }]);
  };

  const handleUpdateSubItem = (index: number, field: 'letter' | 'text', value: string) => {
    setFormSubItems((prev) =>
      prev.map((sub, idx) => (idx === index ? { ...sub, [field]: value } : sub))
    );
  };

  const handleRemoveSubItem = (index: number) => {
    setFormSubItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Save Item (Add or Update)
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    // Filter out empty sub items
    const cleanedSubItems = formSubItems
      .filter((s) => s.text.trim())
      .map((s) => ({ letter: s.letter.trim() || '•', text: s.text.trim() }));

    const itemPayload: Omit<ProgramItem, 'id' | 'order'> = {
      title: formTitle.trim(),
      ...(formLeader.trim() ? { leader: formLeader.trim() } : {}),
      ...(formSectionHeader.trim() ? { sectionHeader: formSectionHeader.trim() } : {}),
      ...(cleanedSubItems.length > 0 ? { subItems: cleanedSubItems } : {}),
    };

    if (editingItem) {
      await updateProgramItem(activeService, editingItem.id, itemPayload);
      showToast(`Updated item #${editingItem.order} successfully!`);
    } else {
      await addProgramItem(activeService, itemPayload);
      showToast('New lineup item added successfully!');
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    await deleteProgramItem(activeService, deletingItem.id);
    showToast(`Removed item #${deletingItem.order} from lineup.`);
    setDeletingItem(null);
  };

  // Move Up / Down
  const handleMove = async (id: number, direction: 'up' | 'down') => {
    await moveProgramItem(activeService, id, direction);
  };

  // Reset to defaults
  const handleConfirmReset = async () => {
    await resetProgramToDefaults(activeService);
    setShowResetConfirm(false);
    if (activeService === 'consecration') {
      setTitleInput(consecrationTitle);
      setSubtitleInput(consecrationSubtitle);
    } else {
      setTitleInput(pastorsOrdinationTitle);
      setSubtitleInput(pastorsOrdinationSubtitle);
    }
    showToast('Reset lineup to official document defaults!');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="font-bold text-sm">{successToast}</p>
        </div>
      )}

      {/* Service Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 rounded-2xl bg-slate-950/80 border border-slate-800">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800/80">
          <button
            type="button"
            onClick={() => handleServiceTabChange('consecration')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeService === 'consecration'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Crown className="w-4 h-4 shrink-0" />
            <span>Consecration Service ({consecrationProgram.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleServiceTabChange('pastors')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeService === 'pastors'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Ordination of Pastors ({pastorOrdinationProgram.length})</span>
          </button>
        </div>

        {/* Global Reset to Document Defaults Button */}
        <button
          type="button"
          onClick={() => setShowResetConfirm(true)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          title="Restore official 2-page document default items"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Document Defaults</span>
        </button>
      </div>

      {/* Service Titles Card & Inline Editor */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
              Active Liturgy Service Header
            </div>
            <h4 className="text-lg font-serif font-bold text-white tracking-wide">
              {currentTitle}
            </h4>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300/80">
              {currentSubtitle}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setTitleInput(currentTitle);
              setSubtitleInput(currentSubtitle);
              setEditingTitles(!editingTitles);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-700 hover:border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 text-amber-400" />
            <span>{editingTitles ? 'Cancel Edit' : 'Edit Service Titles'}</span>
          </button>
        </div>

        {/* Inline Edit Titles Form */}
        {editingTitles && (
          <form
            onSubmit={handleSaveTitles}
            className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-4 animate-in fade-in"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Service Title:
                </label>
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Service Subtitle:
                </label>
                <input
                  type="text"
                  value={subtitleInput}
                  onChange={(e) => setSubtitleInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingTitles(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Titles</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Program Items Manager Section */}
      <div className="space-y-4">
        {/* Controls Bar: Search & Add Item */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${activeItems.length} lineup items...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/20 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lineup Item</span>
            </button>
          </div>
        </div>

        {/* Lineup List */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400 space-y-2">
              <p className="text-sm">No items found matching "{searchQuery}".</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-amber-300 hover:bg-slate-700 cursor-pointer"
              >
                Show All Items
              </button>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isFirst = item.order === 1;
              const isLast = item.order === activeItems.length;

              return (
                <div
                  key={item.id}
                  className="group p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-amber-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Reorder controls + Order Badge + Content */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    {/* Move Up / Down Buttons */}
                    <div className="flex flex-col gap-1 shrink-0 pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleMove(item.id, 'up')}
                        disabled={isFirst}
                        title="Move Up"
                        className={`p-1 rounded-lg border transition-colors cursor-pointer ${
                          isFirst
                            ? 'opacity-25 border-slate-800 text-slate-600 cursor-not-allowed'
                            : 'border-slate-800 hover:border-amber-500/50 bg-slate-900 text-slate-400 hover:text-amber-300'
                        }`}
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(item.id, 'down')}
                        disabled={isLast}
                        title="Move Down"
                        className={`p-1 rounded-lg border transition-colors cursor-pointer ${
                          isLast
                            ? 'opacity-25 border-slate-800 text-slate-600 cursor-not-allowed'
                            : 'border-slate-800 hover:border-amber-500/50 bg-slate-900 text-slate-400 hover:text-amber-300'
                        }`}
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Order Number Badge */}
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-serif font-bold text-amber-300 text-xs sm:text-sm shrink-0">
                      {item.order}
                    </div>

                    {/* Content Details */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      {item.sectionHeader && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-serif font-semibold tracking-wide">
                          <Layers className="w-3 h-3 text-amber-400" />
                          <span>{item.sectionHeader}</span>
                        </div>
                      )}

                      <h5 className="font-serif font-bold text-slate-100 text-sm sm:text-base leading-snug break-words">
                        {item.title}
                      </h5>

                      {item.leader && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-950/40 border border-amber-500/20 text-amber-300 text-xs font-sans">
                          <span className="text-[10px] uppercase font-bold text-amber-500">Led by:</span>
                          <span className="font-semibold">{item.leader}</span>
                        </div>
                      )}

                      {/* Sub-items rendering */}
                      {item.subItems && item.subItems.length > 0 && (
                        <div className="mt-2.5 pl-3 border-l-2 border-amber-500/30 space-y-1">
                          {item.subItems.map((sub, sIdx) => (
                            <div key={sIdx} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="font-serif font-bold text-amber-400 shrink-0 uppercase">
                                {sub.letter}.
                              </span>
                              <span className="text-slate-300 leading-relaxed break-words">{sub.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Action Buttons (Edit / Delete) */}
                  <div className="flex items-center justify-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-900">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(item)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5 text-amber-400" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingItem(item)}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ADD / EDIT PROGRAM ITEM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-amber-500/30 p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  {editingItem ? <Pencil className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-white">
                    {editingItem ? `Edit Lineup Item #${editingItem.order}` : 'Add New Lineup Item'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {isConsecration ? 'Consecration & Ordination Service' : 'Ordination of Pastors'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-5">
              {/* Item Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Item Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OPENING PRAYER / INTRODUCTION OF PROCESSION"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Optional Leader / Officiant */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Leader / Officiant (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Elder Daniel Akorsah, Min. Kofi Nkosuo"
                  value={formLeader}
                  onChange={(e) => setFormLeader(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  The person, minister, or group ministering or leading this segment.
                </p>
              </div>

              {/* Optional Section Header */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Section Header (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Order of Procession or Order of Recession"
                  value={formSectionHeader}
                  onChange={(e) => setFormSectionHeader(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-amber-400"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Shown as a highlighted banner above the item title (used for procession/recession orders).
                </p>
              </div>

              {/* Sub-items (a, b, c...) */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Sub-items / Lineup Roles (Optional)
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Add bulleted sub-steps or procession ministers (a, b, c...).
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddSubItem}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Sub-item</span>
                  </button>
                </div>

                {formSubItems.length > 0 && (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {formSubItems.map((sub, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={sub.letter}
                          onChange={(e) => handleUpdateSubItem(idx, 'letter', e.target.value)}
                          className="w-12 text-center px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-amber-300 font-bold text-xs"
                          placeholder="a"
                        />
                        <input
                          type="text"
                          value={sub.text}
                          onChange={(e) => handleUpdateSubItem(idx, 'text', e.target.value)}
                          placeholder="e.g. Candidate (in white cassock)"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSubItem(idx)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg cursor-pointer"
                          title="Remove sub-item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingItem ? 'Update Lineup Item' : 'Add Item to Lineup'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-rose-500/40 p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Delete Program Item?</h4>
                <p className="text-xs text-slate-400">This action will immediately remove it from attendee bulletins.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-amber-300">Item #{deletingItem.order}</p>
              <p className="font-serif">{deletingItem.title}</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer shadow-md shadow-rose-600/30"
              >
                Yes, Delete Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET TO DEFAULTS CONFIRMATION MODAL */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-rose-500/40 p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Reset to Official Document?</h4>
                <p className="text-xs text-slate-400">
                  Reverts the {isConsecration ? 'Consecration Service (33 items)' : 'Ordination of Pastors (13 items)'} back to the official 2-page document.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Any custom items, edits, or reorderings you made will be replaced by the exact liturgical text from the church program document.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer shadow-md shadow-rose-600/30"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
