import re

f= open('afangar2.txt','r')
output_file = open('gogn.js', 'w')
o = 'const afangar = {'
for line in f:
    a = line.split('\t')
    for i in range(len(a)):
        a[i] = a[i].strip('\n')

    a2 = re.split('\D+', a[1])
    
    threp = int(a2[1])
    feiningar = int(a2[2])
       
    o += a[1]
    o += ':'
    t = '{heiti: "%s", feiningar: %s, threp: %s, gamaltHeiti: "%s", undanfarar: "%s", kennt: "%s",athugasemdir: "%s"},\n'
  
    if (a[1]==''):
        a[1] = 'null'

    if (a[2]==''):
        a[2] = 'null'
    if (a[4]==''):
        a[4] = 'null'
    o +=  t % (a[1],feiningar,threp,a[0],a[2],a[3],a[4])
    #print str(a)

o += '};'
output_file.write(o)
output_file.close()
f.close()
