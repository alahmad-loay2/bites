import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../firebase/getUserInfo';
import { deleteDoc, doc } from 'firebase/firestore';
import { User, ChefHat, LogOut, Trash2, CreditCard, ArrowLeft } from 'lucide-react';
import './account.css';
import getUserInfo from '../../firebase/getUserInfo';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import Loading from '../../components/Loading';

const Account = () => {
  const { userInfo, loading } = getUserInfo();
  const navigate = useNavigate();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (!loading && !userInfo) {
      navigate('/login');
    }
  }, [userInfo, loading, navigate]);
  
  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const password = prompt('Please enter your password to confirm deletion');
      if (!password) return;
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, 'users', user.uid));
      await user.delete();
      navigate('/');
      await logOut();
    } catch (error) {
      console.error("Failed to delete account:", error.message);
      alert("Error: " + error.message);
    }
  };

  if (loading) {
    return (
        <>
        <Loading text={"Loading your profile..."}/>
      </>
    );
  }

  return (
    <div className="account-container">
        <button onClick={() => navigate('/')} className="back">
            <ArrowLeft size={20} />
            back</button>
      <div className="account-card">
        <div className="account-header">
          <User size={32} className="account-icon" />
          <h1>Account Details</h1>
        </div>

        <div className="account-info">
          <div className="info-group">
            <label>Username</label>
            <p>{userInfo.username}</p>
          </div>

          <div className="info-group">
            <label>Email</label>
            <p>{userInfo.email}</p>
          </div>

          <div className="info-group">
            <label>Subscription Status</label>
            <div className="status-badge" data-status={userInfo.paid ? 'active' : 'inactive'}>
              {userInfo.paid ? 'Premium Member' : 'Free Account'}
            </div>
          </div>

          {userInfo.isAdmin && (
            <div className="info-group">
              <div className="admin-badge">
                <ChefHat size={16} />
                Admin Access
              </div>
            </div>
          )}
        </div>

        <div className="account-actions">
          {!userInfo.paid && (
            <button 
              className="upgrade-btn"
              onClick={() => navigate('/payment')}
            >
              <CreditCard size={20} />
              Upgrade to Premium
            </button>
          )}

          <button className="logout-btn" onClick={async () => {
            navigate('/');
            await logOut();
            }}>
            <LogOut size={20} />
            Log Out
          </button>

          <button 
            className="delete-btn"
            onClick={() => setShowConfirmDelete(true)}
          >
            <Trash2 size={20} />
            Delete Account
          </button>
        </div>

        {showConfirmDelete && (
          <div className="delete-confirmation">
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="confirmation-buttons">
              <button 
                className="confirm-delete"
                onClick={handleDeleteAccount}
              >
                Yes, Delete My Account
              </button>
              <button 
                className="cancel-delete"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;