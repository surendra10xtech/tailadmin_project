"use client";
import React, { useRef, useState } from "react";
import { Mic, Square } from "lucide-react";


interface VoiceRecorderProps {
  onRecordComplete?: (audioURL: string) => void;
}
  const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onRecordComplete }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleRecord = async () => {
    if (recording) {
      mediaRecorderRef.current?.stop();
      setRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
      

        // Pass the audio URL to chat message
        if (onRecordComplete) onRecordComplete(url);

        // Stop mic access properly
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      alert("Please allow microphone access!");
      console.error("Mic access error:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Mic Button */}
      <button
        onClick={handleRecord}
        className={`p-2 rounded-full transition-colors duration-200 ${
          recording
            ? "bg-red-500 animate-pulse text-white"
            : "text-gray-600 hover:text-red-500"
        }`}
      >
        {recording ? <Square size={22} /> : <Mic size={22} />}
      </button>
    </div>
  );
};

export default VoiceRecorder;