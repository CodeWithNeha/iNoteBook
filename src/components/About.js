import React from 'react';
import { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

export default function About() {
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);
  
  const a = useContext(noteContext)
  return <div>
      This is About {a.state.name} ans she is in class {a.state.class}
  </div>;
}
