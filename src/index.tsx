import { useState } from 'react';

interface AudioMIDISetupProps {
  onClose: () => void;
}

interface AudioDevice {
  id: string;
  name: string;
  type: 'input' | 'output';
  channels: number;
  sampleRate: number;
  active: boolean;
}

interface MIDIDevice {
  id: string;
  name: string;
  type: 'input' | 'output';
  connected: boolean;
}

const mockAudioDevices: AudioDevice[] = [
  { id: '1', name: 'Built-in Microphone', type: 'input', channels: 2, sampleRate: 48000, active: true },
  { id: '2', name: 'External USB Mic', type: 'input', channels: 1, sampleRate: 44100, active: false },
  { id: '3', name: 'Built-in Speakers', type: 'output', channels: 2, sampleRate: 48000, active: true },
  { id: '4', name: 'Headphones', type: 'output', channels: 2, sampleRate: 48000, active: false },
];

const mockMIDIDevices: MIDIDevice[] = [
  { id: '1', name: 'USB MIDI Controller', type: 'input', connected: true },
  { id: '2', name: 'Virtual MIDI Port', type: 'output', connected: true },
];

const AudioMIDISetup: React.FC<AudioMIDISetupProps> = ({ onClose: _onClose }) => {
  const [tab, setTab] = useState<'audio' | 'midi'>('audio');
  const [audioDevices, setAudioDevices] = useState(mockAudioDevices);
  const [midiDevices] = useState(mockMIDIDevices);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const toggleDevice = (id: string) => {
    setAudioDevices(prev => prev.map(d =>
      d.id === id ? { ...d, active: !d.active } : d
    ));
  };

  return (
    <div className="h-full flex flex-col bg-[#2d2d2d] text-white">
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setTab('audio')}
          className={`flex-1 py-3 text-sm font-medium transition-colors
            ${tab === 'audio' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white/60'}
          `}
        >
          Audio Devices
        </button>
        <button
          onClick={() => setTab('midi')}
          className={`flex-1 py-3 text-sm font-medium transition-colors
            ${tab === 'midi' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white/60'}
          `}
        >
          MIDI Devices
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {tab === 'audio' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-white/50 uppercase mb-2">Input Devices</h3>
              {audioDevices.filter(d => d.type === 'input').map(device => (
                <div
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id)}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors
                    ${selectedDevice === device.id ? 'bg-blue-600/30 ring-1 ring-blue-500' : 'bg-white/5 hover:bg-white/10'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🎤</span>
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-xs text-white/50">
                          {device.channels}ch • {device.sampleRate / 1000}kHz
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleDevice(device.id); }}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors
                        ${device.active ? 'bg-green-600' : 'bg-white/20'}
                      `}
                    >
                      {device.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-semibold text-white/50 uppercase mb-2">Output Devices</h3>
              {audioDevices.filter(d => d.type === 'output').map(device => (
                <div
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id)}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors
                    ${selectedDevice === device.id ? 'bg-blue-600/30 ring-1 ring-blue-500' : 'bg-white/5 hover:bg-white/10'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🔊</span>
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="text-xs text-white/50">
                          {device.channels}ch • {device.sampleRate / 1000}kHz
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleDevice(device.id); }}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors
                        ${device.active ? 'bg-green-600' : 'bg-white/20'}
                      `}
                    >
                      {device.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'midi' && (
          <div className="space-y-4">
            {midiDevices.map(device => (
              <div key={device.id} className="p-3 rounded-lg bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🎹</span>
                    <div>
                      <div className="font-medium">{device.name}</div>
                      <div className="text-xs text-white/50 capitalize">{device.type}</div>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${device.connected ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-white/10 flex justify-end gap-2">
        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors">
          Scan for Devices
        </button>
      </div>
    </div>
  );
};

export default AudioMIDISetup;
