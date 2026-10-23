"""Speech to text for WhatsApp voice notes, on this machine.

faster-whisper (the open Whisper model, int8 on the CPU): free, and the
customer's voice never leaves the box. The model loads on first use and is
cached under data/, so a container rebuild doesn't download it again.
"""

import asyncio
import logging
import tempfile
from pathlib import Path

logger = logging.getLogger("harvey.transcribe")

MODEL_SIZE = "small"   # ~500 MB; good Portuguese for chat audio, a few seconds a note
MODEL_DIR = Path(__file__).resolve().parent.parent / "data" / "whisper"

_model = None
_lock = asyncio.Lock()


def _load():
    global _model
    if _model is None:
        from faster_whisper import WhisperModel
        _model = WhisperModel(MODEL_SIZE, device="cpu", compute_type="int8",
                              download_root=str(MODEL_DIR))
    return _model


def _run(audio: bytes, language: str) -> str:
    with tempfile.NamedTemporaryFile(suffix=".audio") as f:
        f.write(audio)
        f.flush()
        segments, _ = _load().transcribe(f.name, language=language, vad_filter=True)
        return " ".join(s.text.strip() for s in segments).strip()


async def transcribe(audio: bytes, language: str = "pt") -> str:
    """The words in a voice note, or "" when it can't be heard or read."""
    if not audio:
        return ""
    async with _lock:  # one at a time: the model is big and the CPU is shared
        try:
            return await asyncio.to_thread(_run, audio, language)
        except Exception as e:
            logger.warning(f"Transcription failed: {e}")
            return ""
