import os.path
from os import path
import json

basePath = os.path.dirname(os.path.realpath(__file__))

def writeFile(dir, file, userData):
    filePath = os.path.join(basePath, dir, file)
    if path.exists(filePath):
        return False
    else:
        f = open(filePath, "w")
        f.write(json.dumps(userData))
        f.close()
        return True

def readFile(dir, file):
    filePath = os.path.join(basePath, dir, file)
    if path.exists(filePath):
        f = open(filePath, "r")
        fileData = f.read()
        f.close()
        return fileData
    else:
        return False

def updateFile(dir, file, userData):
    filePath = os.path.join(basePath, dir, file)
    if path.exists(filePath):
        f = open(filePath, "w")
        f.write(json.dumps(userData))
        f.close()
        return True
    else:
        return False

def deleteFile(dir, file):
    filePath = os.path.join(basePath, dir, file)
    if path.exists(filePath):
        os.remove(filePath)
        return True
    else:
        return False

       
        
        