import React, { useContext } from 'react';
import UiContext from '../context/UiContext';

const GlobalUI = () => {
  const { loading, toasts } = useContext(UiContext);

  return (
    <>
      {loading && (
        <div style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.35)',zIndex:1050}}>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div style={{position:'fixed',right:20,top:20,zIndex:1200}}>
        {toasts.map(t => (
          <div key={t.id} className={`toast show mb-2 align-items-center text-bg-${t.type}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body">{t.message}</div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GlobalUI;
