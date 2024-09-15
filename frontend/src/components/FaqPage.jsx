import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FaqPage.css'; // Import the CSS file for styling

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editId, setEditId] = useState(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('/faqs'); // Uses Vite proxy
        const data = response.data;
        if (Array.isArray(data)) {
          setFaqs(data);
        } else {
          console.error('FAQ data is not an array:', data);
          setFaqs([]);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setError(error);
      }
    };

    fetchFaqs();
  }, []);

  const handleAdd = async () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      try {
        const response = await axios.post('/faqs', {
          question: newQuestion,
          answer: newAnswer,
        });
        setFaqs([...faqs, response.data]);
        setNewQuestion('');
        setNewAnswer('');
      } catch (error) {
        console.error('Error adding FAQ:', error);
        setError(error);
      }
    } else {
      alert('Please enter both question and answer.');
    }
  };

  const handleEdit = async () => {
    if (editQuestion.trim() && editAnswer.trim()) {
      try {
        const response = await axios.put(`/faqs/${editId}`, {
          question: editQuestion,
          answer: editAnswer,
        });
        setFaqs(faqs.map(faq => (faq._id === editId ? response.data : faq)));
        setEditId(null);
        setEditQuestion('');
        setEditAnswer('');
      } catch (error) {
        console.error('Error updating FAQ:', error);
        setError(error);
      }
    } else {
      alert('Please enter both question and answer.');
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/faqs/${id}`);
        console.log('FAQ deleted:', response.data);
  
        // Update the local state to remove the deleted FAQ
        setFaqs(faqs.filter(faq => faq._id !== id));
      } catch (error) {
        console.error('Error deleting FAQ:', error);
      }
    }
  };
  

  return (
    <div className="faq-container">
      <h2>FAQs</h2>
      <div className="faq-form">
        {editId ? (
          <>
            <h3>Edit FAQ</h3>
            <input
              type="text"
              value={editQuestion}
              onChange={(e) => setEditQuestion(e.target.value)}
              placeholder="Question"
            />
            <textarea
              value={editAnswer}
              onChange={(e) => setEditAnswer(e.target.value)}
              placeholder="Answer"
            />
            <button onClick={handleEdit}>Update</button>
            <button onClick={() => setEditId(null)}>Cancel</button>
          </>
        ) : (
          <>
            <h3>Add New FAQ</h3>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Question"
            />
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Answer"
            />
            <button onClick={handleAdd}>Add</button>
          </>
        )}
      </div>
      {error && <p className="error-message">Error: {error.message}</p>}
      <div className="faq-list">
        {faqs.length > 0 ? (
          faqs.map(faq => (
            <div key={faq._id} className="faq-item">
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
              <button onClick={() => {
                setEditId(faq._id);
                setEditQuestion(faq.question);
                setEditAnswer(faq.answer);
              }}>Edit</button>
              <button onClick={() => handleDelete(faq._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No FAQs available.</p>
        )}
      </div>
    </div>
  );
};

export default FaqPage;
