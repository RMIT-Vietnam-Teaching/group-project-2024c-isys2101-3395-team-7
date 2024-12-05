import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

const VoiceRecorderComponent = ({ setFile }) => {
    const [record, setRecord] = useState(false);

    const startRecording = () => {
        setRecord(true);
    };

    const stopRecording = () => {
        setRecord(false);
    };

    const onStop = async (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob.blobURL);
        await setFile(recordedBlob.blobURL);
    };

    return (
        <div className='w-10'>
            <ReactMic
                record={record}
                className="hidden"
                onStop={onStop} />
            {record && (<p>Listening...</p>)}
            <button className='bg-black text-white hover:bg-orange py-2 px-4 mb-3' onClick={startRecording} type="button">Start</button>
            <button className='bg-black text-white hover:bg-orange py-2 px-4 mb-3' onClick={stopRecording} type="button">Stop</button>
        </div>
    );
};

export default VoiceRecorderComponent;