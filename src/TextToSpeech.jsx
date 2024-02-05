import React, { useState } from "react";
import axios from "axios";

const TextToSpeech = () => {
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const generateAudio = async () => {
    try {
      setLoading(true);

      const encodedParams = new URLSearchParams();
      encodedParams.set("voice_code", "en-US-1");
      encodedParams.set("text", textInput);
      encodedParams.set("speed", "1.00");
      encodedParams.set("pitch", "1.00");
      encodedParams.set("output_type", "audio_url");

      const options = {
        method: "POST",
        url: "https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": import.meta.env.VITE_X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "cloudlabs-text-to-speech.p.rapidapi.com",
        },
        data: encodedParams,
      };

      const response = await axios.request(options);
      setAudioUrl(response.data.result.audio_url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#00b4d8] to-[#90e0ef]">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Text to Audio Generator
        </h1>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4 resize-none focus:outline-none"
          placeholder="Describe what you want to create through your creativity"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          required
        ></textarea>
        <button
          className="bg-[#03045e] text-[#caf0f8] rounded-md p-2 w-full text-center font-medium"
          onClick={generateAudio}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Audio"}
        </button>

        {audioUrl && (
          <audio controls className="mt-4">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        )}
      </div>
    </div>
  );
};

export default TextToSpeech;
