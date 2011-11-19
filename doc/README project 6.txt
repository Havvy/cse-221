Ryan "Bob" Dean and Ryan "Havvy" Scheel

----------------------------------------------------------------------------------------------------

http://code.google.com/p/jslibs/downloads/detail?name=jslibs_version_0.95_r2572.zip

I don't think there's a version that works on MAC. You'll need a Windows enviroment.

----------------------------------------------------------------------------------------------------

note: I'll put a copy in the main folder AND the code folder so you can find it more easily. Sorry for the confusion.





PROJECT 6 (incomplete)


Open command prompt, cd yourdrive: ../jslibs/bin/ then run jshost ../code/obj/routeLoad.js to see what we got working.

To see the code that does most of the work, open Node.js in notepad/++/etc.

Havvy did not give me a copy of the test data for this project, and his USB drive broke this evening. Them's the breaks.

On the plus side, I have the latest version here. On the down side, it's very incomplete. All we managed to accomplish was getting it to read in airport data (1 and 2 way) and made a function to print them as a list. 

We're hoping to talk to you Monday about how to make it... ya know, do stuff. We wrestled with it for a couple hours and eventually ran out of time (and left more confused than we did going into it).





Output of routeLoad.js:

G:\jslibs\bin>jshost ..\code\routeLoad.js


From [Cost, Time] To

PDX:
PDX-[233, 295]->ORD
PDX-[120, 209]->PHX
PDX-[538, 336]->ATL
PDX-[95, 112]->SEA
PDX-[65, 129]->GEG
PDX-[121, 59]->VUO
PDX-[89, 30]->HIO
PDX-[125, 62]->TTD
PDX-[168, 256]->MSP
PDX-[85, 90]->EUG

ORD:
ORD-[233, 328]->PDX
ORD-[156, 288]->PHX
ORD-[236, 105]->MLI

PHX:
PHX-[120, 234]->PDX
PHX-[156, 256]->ORD
PHX-[183, 287]->ATL
PHX-[185, 189]->BOI
PHX-[355, 144]->HIO
PHX-[168, 195]->DFW
PHX-[100, 162]->SLC
PHX-[133, 219]->OMA

ATL:
ATL-[183, 322]->PHX
ATL-[538, 396]->PDX

BOI:
BOI-[185, 178]->PHX
BOI-[150, 166]->SJC
BOI-[107, 160]->SEA
BOI-[106, 117]->LWS

SJC:
SJC-[150, 179]->BOI

HNL:
HNL-[86, 95]->KOA

KOA:
KOA-[86, 95]->HNL

HIO:
HIO-[355, 125]->PHX
HIO-[89, 30]->PDX
HIO-[29, 26]->VUO

SEA:
SEA-[107, 146]->BOI
SEA-[95, 107]->PDX
SEA-[80, 119]->ALW
SEA-[110, 123]->PUW
SEA-[80, 120]->GEG
SEA-[81, 112]->PSC
SEA-[124, 125]->EUG

DEN:
DEN-[68, 145]->OMA
DEN-[219, 171]->FAR
DEN-[171, 176]->MLI
DEN-[95, 175]->MSP
DEN-[62, 123167]->SLC
DEN-[231, 238]->EUG

OMA:

MLI:
MLI-[236, 105]->ORD
MLI-[171, 203]->DEN
MLI-[206, 205]->DFW

ALW:
ALW-[80, 124]->SEA

BFF:
BFF-[121, 115]->DEN

PUW:
PUW-[110, 134]->SEA

GEG:
GEG-[80, 129]->SEA
GEG-[65, 145]->PDX
GEG-[180, 236]->MSP

DLS:
DLS-[110, 5]->Dufur
DLS-[40, 55]->TTD

Dufur:

VUO:
VUO-[121, 59]->PDX
VUO-[23, 25]->TTD
VUO-[29, 26]->HIO

TTD:
TTD-[125, 62]->PDX
TTD-[23, 25]->VUO
TTD-[40, 55]->DLS
TTD-[53, ]->S33

S33:
S33-[53, ]->TTD

FAR:
FAR-[219, 189]->DEN

DFW:
DFW-[206, 180]->CID
DFW-[168, 216]->PHX

CID:

MSP:
MSP-[95, 190]->DEN
MSP-[168, 292]->PDX
MSP-[180, 262]->GEG

PSC:
PSC-[81, 122]->SEA

LWS:
LWS-[100, 57]->PUW
LWS-[106, 110]->BOI
LWS-[155, 152]->SLC

SLC:
SLC-[155, 157]->LWS
SLC-[100, 167]->PHX
SLC-[140, 185]->EUG

PVU:
PVU-[62, 143]->DEN

EUG:
EUG-[140, 174]->SLC
EUG-[85, 90]->PDX
EUG-[231, 214]->DEN
EUG-[124, 125]->SEA



G:\jslibs\bin>