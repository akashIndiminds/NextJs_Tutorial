// app/settings/Settings.tsx

'use client';  // Add this directive to indicate that this is a client-side component

import './settings.css';
import { useState } from 'react';

const Settings = () => {
  // State for managing theme and notifications
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');
  const [newPassword, setNewPassword] = useState('');

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    // Logic to apply theme (this could involve setting CSS variables or applying a class)
  };

  const handleNotificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(e.target.checked);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSaveSettings = () => {
    // Logic for saving the settings can be added here, like API calls or updating local storage
    alert('Settings have been saved!');
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Theme Setting */}
      <div className="setting-option">
        <label htmlFor="theme">Theme:</label>
        <select id="theme" value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Notifications Setting */}
      <div className="setting-option">
        <label htmlFor="notifications">Notifications:</label>
        <input
          type="checkbox"
          id="notifications"
          checked={notifications}
          onChange={handleNotificationsChange}
        />
      </div>

      {/* Language Setting */}
      <div className="setting-option">
        <label htmlFor="language">Language:</label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
        </select>
      </div>

      {/* Password Change */}
      <div className="setting-option">
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          value={newPassword}
          onChange={handlePasswordChange}
          placeholder="Enter new password"
        />
      </div>

      {/* Save Settings Button */}
      <button className="save-settings-btn" onClick={handleSaveSettings}>
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
