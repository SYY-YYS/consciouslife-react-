def draw(n):
    string = '◢' + '■'*int((n-4)/2) + '◣'
    string += string + '\n'
    
    string += '■'* n + '\n'
        
    for i in range(int(n/2)): #0,1,2
        string += ' '*i + '◥' + '■'*int(n+(i+3-2)*(-2)) + '◤' + ' '*i + '\n'

    return string
print(draw(6))