import React from "react";

const EducationalPanel = () => (
  <aside className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6 max-w-md mx-auto">
    <h3 className="font-bold text-blue-700 mb-2">Password Security Tips</h3>
    <ul className="list-disc list-inside text-blue-900 text-sm space-y-1">
      <li>Use long, random passwords or passphrases.</li>
      <li>Never reuse passwords across sites.</li>
      <li>Use a password manager to store your passwords securely.</li>
      <li>Enable two-factor authentication where possible.</li>
      <li>Follow the latest NIST/OWASP guidelines for password security.</li>
    </ul>
  </aside>
);

export default EducationalPanel;
