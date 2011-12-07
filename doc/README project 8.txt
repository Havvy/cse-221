Ryan "Bob" Dean and Ryan "Havvy" Scheel

http://code.google.com/p/jslibs/downloads/detail?name=jslibs_version_0.95_r2572.zip

Unfortunately, I don't think there's a version that works on MAC. You'll need a Windows enviroment.

Open command prompt, cd yourdrive: ../jslibs/bin/ then run jshost ../code/obj/polyCalc.js

To see our tests... just look at polyCalc.js.

At the moment I've writing this, I (Bob) have addition, subtraction, and multiplication working. I could eventually get division working maybe possibly, but It's almost midnight so I'm calling it a night.

Havvy was working on a place to enter input and such but disappeared on me, so if you want to test it yourself, you'll have to edit it manually. 

At the bottom of polyCalc is the actual test that prints the output below, feel free to change any of the addTerms and subtractTerms numbers, the arguments being (Coef, Expo).

It's not pretty, and it's not done, but it's close to the latter and not far from the former. For all I know, he could have the shell complete.
--------------------------------------------------------------------------------------------------------------


G:\js\bin>jshost ..\code\prog\polyCalc.js
poly1 =  + 4x^2 + 2x^1 + 3x^0
poly2 =  + 9x^4 - 7x^1
poly1 + poly2 =  + 9x^4 + 4x^2 - 5x^1 + 3x^0
poly1 - poly2 =  - 9x^4 + 4x^2 + 9x^1 + 3x^0
poly1 * poly2 =  + 36x^6 + 18x^5 + 27x^4 - 28x^3 - 14x^2 - 21x^1

G:\js\bin>