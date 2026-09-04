export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
}

const NEWS_STORAGE_KEY = 'salidas-news';

// Load news from localStorage
export const loadNews = (): NewsItem[] => {
  try {
    const storedNews = localStorage.getItem(NEWS_STORAGE_KEY);
    return storedNews ? JSON.parse(storedNews) : [];
  } catch (error) {
    console.error('Error loading news:', error);
    return [];
  }
};

// Save news to localStorage
export const saveNews = (news: NewsItem[]): void => {
  try {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
  } catch (error) {
    console.error('Error saving news:', error);
  }
};

// Add a single news item
export const addNewsItem = (title: string, content: string): NewsItem => {
  const newItem: NewsItem = {
    id: Date.now().toString(),
    title: title.trim(),
    content: content.trim(),
    date: new Date().toLocaleDateString('es-ES')
  };
  
  const currentNews = loadNews();
  const updatedNews = [newItem, ...currentNews];
  saveNews(updatedNews);
  
  return newItem;
};

// Update a news item
export const updateNewsItem = (id: string, title: string, content: string): void => {
  const currentNews = loadNews();
  const updatedNews = currentNews.map(item =>
    item.id === id
      ? { ...item, title: title.trim(), content: content.trim() }
      : item
  );
  saveNews(updatedNews);
};

// Delete a news item
export const deleteNewsItem = (id: string): void => {
  const currentNews = loadNews();
  const updatedNews = currentNews.filter(item => item.id !== id);
  saveNews(updatedNews);
};