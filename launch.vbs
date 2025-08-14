Set WshShell = CreateObject("WScript.Shell")
' Va dans le dossier du projet
WshShell.CurrentDirectory = "C:\Users\samba\Desktop\fake-lockscreen-demo"
' Lance npm start via cmd pour être sûr de trouver npm
WshShell.Run "cmd /c npm start", 0, False
