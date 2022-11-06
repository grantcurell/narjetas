import React from 'react';

// https://stackoverflow.com/a/44661948/4427375
export default function Download(props) {
    const downloadTxtFile = () => {
      const element = document.createElement("a");
      const file = new Blob([props.text], {type: 'text/plain;charset=utf-8'});
      element.href = URL.createObjectURL(file);
      element.download = "fleeshcards.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
    
    return (
    <div>
        <button onClick={downloadTxtFile}>Descargar diese fleeshcards!</button>
    </div>
    );
}
  