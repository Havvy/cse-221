Ryan "Bob" Dean and Ryan "Havvy" Scheel

----------------------------------------------------------------------------------------------------

http://code.google.com/p/jslibs/downloads/detail?name=jslibs_version_0.95_r2572.zip

I don't think there's a version that works on MAC. You'll need a Windows enviroment.

----------------------------------------------------------------------------------------------------

note: I'll put a copy in the main folder AND the code folder so you can find it more easily. Sorry for the confusion.





PROJECT 6 (incomplete)


Open command prompt, cd yourdrive: ../jslibs/bin/ then run jshost ../code/obj/routeLoad.js.

To see our tests, run jshost../code/test/NodeTest.js

The backends doing most of the work are /code/obj/Node.js and /code/obj/Graph.js.

Everything seems to work correctly! Instead of reading in the test data, I made an interface to enter the start, end, and desired weight(s). 
It's really sloppy and I could make it look nicer, but it works, and we gotta focus on the next project.


----------------------------------------------------------------------------------------------------


Output of print(airports);


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


------------------------------------------------------------------------------------------

Output of routeLoad.js


G:\js\bin>jshost ..\code\prog\routeLoad.js


Welcome to the BobHavvy Trip Planning simulator.
To quit at any time, enter q at the first question.
To see a list of airports, enter l.
To see all airports and routes, enter w.


Where are you starting from?: pdx
Where are you trying to go?: atl
What's more important to you, time, money, or luxury?: money
On a budget? Hope you don't mind screaming kids.
PDX --> PHX --> ATL, and it will only take 303 units of currency.


Where are you starting from?: pdx
Where are you trying to go?: atl
What's more important to you, time, money, or luxury?: time
In a hurry eh? Then this is the route for you.
PDX --> ATL, and it will only take 336 units of time.


Where are you starting from?: vuo
Where are you trying to go?: DFW
What's more important to you, time, money, or luxury?: money
On a budget? Hope you don't mind screaming kids.
VUO --> HIO --> PDX --> PHX --> DFW, and it will only take 406 units of currency
.


Where are you starting from?: vuo
Where are you trying to go?: dfw
What's more important to you, time, money, or luxury?: time
In a hurry eh? Then this is the route for you.
VUO --> HIO --> PHX --> DFW, and it will only take 346 units of time.


Where are you starting from?: pdx
Where are you trying to go?: dfw
What's more important to you, time, money, or luxury?: money
On a budget? Hope you don't mind screaming kids.
PDX --> PHX --> DFW, and it will only take 288 units of currency.


Where are you starting from?: pdx
Where are you trying to go?: dfw
What's more important to you, time, money, or luxury?: time
In a hurry eh? Then this is the route for you.
PDX --> HIO --> PHX --> DFW, and it will only take 350 units of time.


Where are you starting from?: vuo
Where are you trying to go?: mli
What's more important to you, time, money, or luxury?: money
On a budget? Hope you don't mind screaming kids.
VUO --> HIO --> PDX --> MSP --> DEN --> MLI, and it will only take 552 units of
currency.


Where are you starting from?: vuo
Where are you trying to go?: mli
What's more important to you, time, money, or luxury?: time
In a hurry eh? Then this is the route for you.
VUO --> HIO --> PDX --> ORD --> MLI, and it will only take 456 units of time.


Where are you starting from?: pdx
Where are you trying to go?: jfk
This is not an airport recognized by this program. Please start again.


Where are you starting from?: puw
Where are you trying to go?: far
What's more important to you, time, money, or luxury?: luxury
More money than God and all the time in the world? Here you go, also I hate you.

PUW --> SEA --> BOI --> PHX --> HIO --> PDX --> ORD --> MLI --> DEN --> FAR
is on average the most expensive, time consuming route.


Where are you starting from?: eug
Where are you trying to go?: puw
What's more important to you, time, money, or luxury?: money
On a budget? Hope you don't mind screaming kids.
EUG --> SEA --> PUW, and it will only take 234 units of currency.


Where are you starting from?: eug
Where are you trying to go?: oma
What's more important to you, time, money, or luxury?: time
In a hurry eh? Then this is the route for you.
EUG --> DEN --> OMA, and it will only take 359 units of time.


Where are you starting from?: eug
Where are you trying to go?: koa
What's more important to you, time, money, or luxury?: money
On a budget? Hope you don't mind screaming kids.
No such route exists. Maybe you can hitchhike there?

Where are you starting from?: q
Thank you. Now I can rest.

G:\js\bin>