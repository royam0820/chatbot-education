'use client';

import React, { useState } from 'react';
import styles from './EducationalChatbot.module.css';

const topics = ['History', 'Geography', 'Math', 'Science'];

const EducationalChatbot: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTopicSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
    setQuery('');  // Clear the query
    setAnswer(''); // Clear the previous answer
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: selectedTopic, query }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer');
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error:', error);
      setAnswer('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Educational Chatbot</h1>
      
      <div className={styles.topicSelector}>
        <label htmlFor="topic-select">Select a topic:</label>
        <select 
          id="topic-select"
          className={styles.select} 
          value={selectedTopic} 
          onChange={handleTopicSelect}
        >
          <option value="">Choose a topic</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      {selectedTopic && (
        <div className={styles.selectedTopic}>
          Current topic: <span>{selectedTopic}</span>
        </div>
      )}

      {selectedTopic && (
        <form className={styles.form} onSubmit={handleQuerySubmit}>
          <label htmlFor="query-input">Your question:</label>
          <textarea
            id="query-input"
            className={styles.textarea}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask a question about ${selectedTopic}`}
            rows={4}
          />
          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Ask'}
          </button>
        </form>
      )}

      {answer && (
        <div className={styles.answer}>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default EducationalChatbot;