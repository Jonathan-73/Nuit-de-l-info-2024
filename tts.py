from gtts import gTTS

# Texte que tu veux convertir en audio
text = "Pierre Schuller... Veux-tu que je te Rondoudou le Rattata ?"

# Créer un objet gTTS
tts = gTTS(text=text, lang='ro')

# Sauvegarder l'audio dans un fichier
tts.save("fichiers_mp3/output_ro.mp3")
