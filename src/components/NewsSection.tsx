import React, { useState, useEffect, useRef } from 'react';
import { Save } from 'lucide-react';

const NewsSection: React.FC = () => {
  const [newsContent, setNewsContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load news content on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('news-content') || '';
    setNewsContent(savedContent);
    setLastSaved(localStorage.getItem('news-last-saved') || '');
  }, []);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current && isEditing) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      // Minimum height of 120px (about 5 lines), maximum of 400px
      const newHeight = Math.max(120, Math.min(400, scrollHeight));
      textarea.style.height = `${newHeight}px`;
    }
  }, [newsContent, isEditing]);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (newsContent !== (localStorage.getItem('news-content') || '')) {
        handleSave();
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timer);
  }, [newsContent]);

  const handleSave = () => {
    localStorage.setItem('news-content', newsContent);
    const now = new Date().toLocaleString('es-ES');
    localStorage.setItem('news-last-saved', now);
    setLastSaved(now);
    setIsEditing(false);
  };

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  // Calculate display area height based on content
  const getDisplayHeight = () => {
    if (!newsContent) return 'min-h-[80px]'; // Small height for empty state
    
    const lines = newsContent.split('\n').length;
    const estimatedLines = Math.max(lines, Math.ceil(newsContent.length / 80)); // Estimate based on character count too
    
    if (estimatedLines <= 3) return 'min-h-[80px]';
    if (estimatedLines <= 6) return 'min-h-[120px]';
    if (estimatedLines <= 10) return 'min-h-[200px]';
    return 'min-h-[280px] max-h-[400px] overflow-y-auto';
  };

  return (
    <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-blue-200 dark:border-gray-600 shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-blue-200 dark:border-gray-600">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
            📢 Noticias e Información
          </h2>
          {lastSaved && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Guardado: {lastSaved}
            </span>
          )}
        </div>
      </div>

      {/* Dynamic News Content Area */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              ref={textareaRef}
              value={newsContent}
              onChange={(e) => setNewsContent(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono text-sm leading-relaxed transition-all duration-200"
              placeholder="Escribe las noticias e información aquí...&#10;&#10;Consejos:&#10;• Presiona Ctrl+Enter para guardar&#10;• Presiona Escape para salir del modo edición&#10;• El contenido se guarda automáticamente"
              autoFocus
              style={{ minHeight: '120px' }}
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Ctrl+Enter para guardar • Escape para salir • Auto-guardado activado
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <Save size={16} />
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={handleTextClick}
            className={`${getDisplayHeight()} p-4 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-600 cursor-text hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 group`}
          >
            {newsContent ? (
              <div className="whitespace-pre-wrap text-gray-900 dark:text-gray-100 leading-relaxed">
                {newsContent}
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 italic flex items-center justify-center h-full">
                Haz clic aquí para agregar noticias e información...
              </div>
            )}
            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400 dark:text-gray-500">
              💡 Haz clic para editar
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;