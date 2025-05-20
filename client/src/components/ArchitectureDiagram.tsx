import React from 'react';
import './ArchitectureDiagram.css';

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="architecture-container">
      <div className="architecture-title">
        <h1>TRAVELEASE ARCHITECTURE</h1>
      </div>
      
      <div className="architecture-layers">
        {/* Top Row of Boxes */}
        <div className="layer-row">
          <div className="layer-box">
            <h3>PRESENTATION LAYER</h3>
            <ul>
              <li>UI Components</li>
              <li>- Dashboard</li>
              <li>- Trip Cards</li>
              <li>- Forms</li>
              <li>- Galleries</li>
            </ul>
          </div>
          
          <div className="layer-box">
            <h3>ROUTING LAYER</h3>
            <ul>
              <li>Route Protection</li>
              <li>- Public Routes</li>
              <li>- Private Routes</li>
              <li>- Route Guards</li>
            </ul>
          </div>
          
          <div className="layer-box">
            <h3>SERVICES LAYER</h3>
            <ul>
              <li>Firebase Auth</li>
              <li>- Authentication</li>
              <li>- User Profiles</li>
              <li>- Session Mgmt</li>
            </ul>
          </div>
          
          <div className="layer-box">
            <h3>STORAGE LAYER</h3>
            <ul>
              <li>Firestore DB</li>
              <li>- Users</li>
              <li>- Trips</li>
              <li>- Destinations</li>
              <li>- Photos</li>
            </ul>
          </div>
        </div>
        
        {/* Second Row of Boxes */}
        <div className="layer-row">
          <div className="layer-box">
            <h3>STATE MANAGEMENT</h3>
            <ul>
              <li>- Context API</li>
              <li>- Local State</li>
              <li>- TanStack Query</li>
            </ul>
          </div>
          
          <div className="layer-box">
            <h3>NAVIGATION</h3>
            <ul>
              <li>- Wouter</li>
              <li>- Link Components</li>
              <li>- Params</li>
            </ul>
          </div>
          
          <div className="layer-box">
            <h3>API SERVICES</h3>
            <ul>
              <li>- Trip Service</li>
              <li>- User Service</li>
              <li>- Media Service</li>
              <li>- Notifications</li>
            </ul>
          </div>
          
          <div className="layer-box">
            <h3>FIREBASE STORAGE</h3>
            <ul>
              <li>- Image Storage</li>
              <li>- Document Storage</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Row of Boxes */}
        <div className="layer-row bottom-row">
          <div className="layer-box">
            <h3>UTILITY LAYER</h3>
            <ul>
              <li>- Error Handling</li>
              <li>- Date Utils</li>
              <li>- Form Validation</li>
              <li>- Formatters</li>
            </ul>
          </div>
          
          <div className="layer-box">
            <h3>THEMING LAYER</h3>
            <ul>
              <li>- Black & Red Theme</li>
              <li>- Responsive Design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;