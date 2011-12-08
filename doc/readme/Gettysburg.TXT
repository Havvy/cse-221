Ryan "Bob" Dean and Ryan "Havvy" Scheel

http://code.google.com/p/jslibs/downloads/detail?name=jslibs_version_0.95_r2572.zip

Unfortunately, I don't think there's a version that works on MAC. You'll need a Windows enviroment.

Open command prompt, cd yourdrive: ../jslibs/bin/ then run jshost ../code/obj/gettysberg.js

To see our tests, run jshost../code/test/BinaryNode.js

At the moment I've writing this, we don't have any printed output (this has been the hardest part, actually) so any test outputs would just be a bunch of passes.

However, the print functions work mostly: we had a space/null appearing in our data somehow, but found a way to filter it out. Also, the end of treedata has an extra number printing out at the end and I don't can't get it to not do that.

At the moment of writing this, we have not got a balanced tree working.

--------------------------------------------------------------------------------------------------------------

G:\jslibs\bin>jshost ..\code\gettysburg.js
What would you like to know about the Gettysburg Address?
 t: tree data
 w: word frequency/alphabetical order
 s: shape of Tree
 h: histogram
 anything else: Quit


h

 depth  # of nodes
   1:       2
   2:       4
   3:       8
   4:       11
   5:       14
   6:       21
   7:       20
   8:       15
   9:       17
   10:      16
   11:      6
   12:      3

G:\jslibs\bin>jshost ..\code\gettysburg.js
What would you like to know about the Gettysburg Address?
 t: tree data
 w: word frequency/alphabetical order
 s: shape of Tree
 h: histogram
 anything else: Quit


t

 #      word       left child       right child     size

 1      four          /and           \score         138
 2      and           /ago           \fathers       49
 3      ago           /a             \all           7
 4      a             /N             \above         4
 5      above         /N             \add           3
 6      add           /N             \advanced      2
 7      advanced      /N             \N             1
 8      all           /N             \altogether    2
 9      altogether    /N             \N             1
 10     fathers       /brought       \forth         41
 11     brought       /are           \continent     33
 12     are           /any           \battle        8
 13     any           /N             \N             1
 14     battle        /as            \brave         6
 15     as            /N             \N             1
 16     brave         /be            \N             4
 17     be            /N             \before        3
 18     before        /N             \birth         2
 19     birth         /N             \N             1
 20     continent     /conceived     \dedicated     24
 21     conceived     /civil         \consecrate    9
 22     civil         /can           \come          6
 23     can           /but           \cause         4
 24     but           /N             \by            2
 25     by            /N             \N             1
 26     cause         /N             \N             1
 27     come          /N             \N             1
 28     consecrate    /N             \consecrated   2
 29     consecrated   /N             \N             1
 30     dedicated     /created       \equal         14
 31     created       /N             \dedicate      3
 32     dedicate      /dead          \N             2
 33     dead          /N             \N             1
 34     equal         /engaged       \far           10
 35     engaged       /endure        \N             8
 36     endure        /do            \N             7
 37     do            /detract       \earth         6
 38     detract       /N             \did           4
 39     did           /devotion      \died          3
 40     devotion      /N             \N             1
 41     died          /N             \N             1
 42     earth         /N             \N             1
 43     far           /N             \N             1
 44     forth         /field         \fought        7
 45     field         /N             \final         5
 46     final         /N             \for           4
 47     for           /fitting       \forget        3
 48     fitting       /N             \N             1
 49     forget        /N             \N             1
 50     fought        /N             \N             1
 51     score         /our           \seven         88
 52     our           /on            \proposition   55
 53     on            /new           \or            40
 54     new           /nation        \now           38
 55     nation        /in            \never         31
 56     in            /great         \liberty       29
 57     great         /gave          \have          13
 58     gave          /from          \god           6
 59     from          /freedom       \full          3
 60     freedom       /N             \N             1
 61     full          /N             \N             1
 62     god           /N             \government    2
 63     government    /N             \N             1
 64     have          /hallow        \here          6
 65     hallow        /ground        \N             2
 66     ground        /N             \N             1
 67     here          /N             \honored       3
 68     honored       /highly        \N             2
 69     highly        /N             \N             1
 70     liberty       /it            \men           15
 71     it            /is            \larger        5
 72     is            /increased     \N             2
 73     increased     /N             \N             1
 74     larger        /N             \last          2
 75     last          /N             \N             1
 76     men           /long          \met           9
 77     long          /lives         \measure       6
 78     lives         /live          \living        4
 79     live          /little        \N             2
 80     little        /N             \N             1
 81     living        /N             \N             1
 82     measure       /N             \N             1
 83     met           /N             \might         2
 84     might         /N             \N             1
 85     never         /N             \N             1
 86     now           /not           \of            6
 87     not           /nor           \note          4
 88     nor           /nobly         \N             2
 89     nobly         /N             \N             1
 90     note          /N             \N             1
 91     of            /N             \N             1
 92     or            /N             \N             1
 93     proposition   /portion       \resting       14
 94     portion       /place         \proper        7
 95     place         /people        \poor          4
 96     people        /N             \perish        2
 97     perish        /N             \N             1
 98     poor          /N             \N             1
 99     proper        /power         \N             2
 100    power         /N             \N             1
 101    resting       /remember      \say           6
 102    remember      /rather        \resolve       4
 103    rather        /N             \remaining     2
 104    remaining     /N             \N             1
 105    resolve       /N             \N             1
 106    say           /N             \N             1
 107    seven         /sense         \years         32
 108    sense         /N             \N             1
 109    years         /this          \N             30
 110    this          /the           \to            29
 111    the           /that          \their         12
 112    that          /testing       \N             8
 113    testing       /so            \N             7
 114    so            /should        \struggled     6
 115    should        /shall         \N             2
 116    shall         /N             \N             1
 117    struggled     /N             \task          3
 118    task          /take          \N             2
 119    take          /N             \N             1
 120    their         /N             \they          3
 121    they          /these         \N             2
 122    these         /N             \N             1
 123    to            /those         \we            16
 124    those         /N             \thus          2
 125    thus          /N             \N             1
 126    we            /war           \whether       13
 127    war           /us            \N             5
 128    us            /unfinished    \vain          4
 129    unfinished    /under         \N             2
 130    under         /N             \N             1
 131    vain          /N             \N             1
 132    whether       /what          \who           7
 133    what          /N             \N             1
 134    who           /which         \world         5
 135    which         /N             \N             1
 136    world         /will          \N             3
 137    will          /N             \work          2
 138    work          /N             \N             1
139

G:\jslibs\bin>jshost ..\code\gettysburg.js
What would you like to know about the Gettysburg Address?
 t: tree data
 w: word frequency/alphabetical order
 s: shape of Tree
 h: histogram
 anything else: Quit


w

 word        count

 a             7
 above         1
 add           1
 advanced      1
 ago           1
 all           1
 altogether    1
 and           6
 any           1
 are           3
 as            1
 battle        1
 be            2
 before        1
 birth         1
 brave         1
 brought       1
 but           2
 by            1
 can           5
 cause         1
 civil         1
 come          1
 conceived     2
 consecrate    1
 consecrated   1
 continent     1
 created       1
 dead          3
 dedicate      2
 dedicated     4
 detract       1
 devotion      2
 did           1
 died          1
 do            1
 earth         1
 endure        1
 engaged       1
 equal         1
 far           2
 fathers       1
 field         2
 final         1
 fitting       1
 for           5
 forget        1
 forth         1
 fought        1
 four          1
 freedom       1
 from          2
 full          1
 gave          2
 god           1
 government    1
 great         3
 ground        1
 hallow        1
 have          5
 here          8
 highly        1
 honored       1
 in            4
 increased     1
 is            3
 it            5
 larger        1
 last          1
 liberty       1
 little        1
 live          1
 lives         1
 living        2
 long          2
 measure       1
 men           2
 met           1
 might         1
 nation        5
 never         1
 new           2
 nobly         1
 nor           1
 not           5
 note          1
 now           1
 of            5
 on            2
 or            2
 our           2
 people        3
 perish        1
 place         1
 poor          1
 portion       1
 power         1
 proper        1
 proposition   1
 rather        2
 remaining     1
 remember      1
 resolve       1
 resting       1
 say           1
 score         1
 sense         1
 seven         1
 shall         3
 should        1
 so            3
 struggled     1
 take          1
 task          1
 testing       1
 that          13
 the           11
 their         1
 these         2
 they          3
 this          4
 those         1
 thus          1
 to            8
 under         1
 unfinished    1
 us            3
 vain          1
 war           2
 we            10
 what          2
 whether       1
 which         2
 who           3
 will          1
 work          1
 world         1
 years         1

G:\jslibs\bin>jshost ..\code\gettysburg.js
What would you like to know about the Gettysburg Address?
 t: tree data
 w: word frequency/alphabetical order
 s: shape of Tree
 h: histogram
 anything else: Quit


s
               ---< a
                    ---< above
                         ---< add
                              ---< advanced
          ---< ago
               ---< all
                    ---< altogether
     ---< and
                         ---< any
                    ---< are
                              ---< as
                         ---< battle
                                   ---< be
                                        ---< before
                                             ---< birth
                              ---< brave
               ---< brought
                                        ---< but
                                             ---< by
                                   ---< can
                                        ---< cause
                              ---< civil
                                   ---< come
                         ---< conceived
                              ---< consecrate
                                   ---< consecrated
                    ---< continent
                              ---< created
                                        ---< dead
                                   ---< dedicate
                         ---< dedicated
                                                  ---< detract
                                                            ---< devotion
                                                       ---< did
                                                            ---< died
                                             ---< do
                                                  ---< earth
                                        ---< endure
                                   ---< engaged
                              ---< equal
                                   ---< far
          ---< fathers
                    ---< field
                         ---< final
                                   ---< fitting
                              ---< for
                                   ---< forget
               ---< forth
                    ---< fought
---< four
                                                  ---< freedom
                                             ---< from
                                                  ---< full
                                        ---< gave
                                             ---< god
                                                  ---< government
                                   ---< great
                                                  ---< ground
                                             ---< hallow
                                        ---< have
                                             ---< here
                                                       ---< highly
                                                  ---< honored
                              ---< in
                                                  ---< increased
                                             ---< is
                                        ---< it
                                             ---< larger
                                                  ---< last
                                   ---< liberty
                                                            ---< little
                                                       ---< live
                                                  ---< lives
                                                       ---< living
                                             ---< long
                                                  ---< measure
                                        ---< men
                                             ---< met
                                                  ---< might
                         ---< nation
                              ---< never
                    ---< new
                                        ---< nobly
                                   ---< nor
                              ---< not
                                   ---< note
                         ---< now
                              ---< of
               ---< on
                    ---< or
          ---< our
                              ---< people
                                   ---< perish
                         ---< place
                              ---< poor
                    ---< portion
                              ---< power
                         ---< proper
               ---< proposition
                              ---< rather
                                   ---< remaining
                         ---< remember
                              ---< resolve
                    ---< resting
                         ---< say
     ---< score
               ---< sense
          ---< seven
                                                  ---< shall
                                             ---< should
                                        ---< so
                                             ---< struggled
                                                       ---< take
                                                  ---< task
                                   ---< testing
                              ---< that
                         ---< the
                              ---< their
                                        ---< these
                                   ---< they
                    ---< this
                              ---< those
                                   ---< thus
                         ---< to
                                                  ---< under
                                             ---< unfinished
                                        ---< us
                                             ---< vain
                                   ---< war
                              ---< we
                                        ---< what
                                   ---< whether
                                             ---< which
                                        ---< who
                                                  ---< will
                                                       ---< work
                                             ---< world
               ---< years

               ---< a
                    ---< above
                         ---< add
                              ---< advanced
          ---< ago
               ---< all
                    ---< altogether
     ---< and
                         ---< any
                    ---< are
                              ---< as
                         ---< battle
                                   ---< be
                                        ---< before
                                             ---< birth
                              ---< brave
               ---< brought
                                        ---< but
                                             ---< by
                                   ---< can
                                        ---< cause
                              ---< civil
                                   ---< come
                         ---< conceived
                              ---< consecrate
                                   ---< consecrated
                    ---< continent
                              ---< created
                                        ---< dead
                                   ---< dedicate
                         ---< dedicated
                                                  ---< detract
                                                            ---< devotion
                                                       ---< did
                                                            ---< died
                                             ---< do
                                                  ---< earth
                                        ---< endure
                                   ---< engaged
                              ---< equal
                                   ---< far
          ---< fathers
                    ---< field
                         ---< final
                                   ---< fitting
                              ---< for
                                   ---< forget
               ---< forth
                    ---< fought
---< four
                                                  ---< freedom
                                             ---< from
                                                  ---< full
                                        ---< gave
                                             ---< god
                                                  ---< government
                                   ---< great
                                                  ---< ground
                                             ---< hallow
                                        ---< have
                                             ---< here
                                                       ---< highly
                                                  ---< honored
                              ---< in
                                                  ---< increased
                                             ---< is
                                        ---< it
                                             ---< larger
                                                  ---< last
                                   ---< liberty
                                                            ---< little
                                                       ---< live
                                                  ---< lives
                                                       ---< living
                                             ---< long
                                                  ---< measure
                                        ---< men
                                             ---< met
                                                  ---< might
                         ---< nation
                              ---< never
                    ---< new
                                        ---< nobly
                                   ---< nor
                              ---< not
                                   ---< note
                         ---< now
                              ---< of
               ---< on
                    ---< or
          ---< our
                              ---< people
                                   ---< perish
                         ---< place
                              ---< poor
                    ---< portion
                              ---< power
                         ---< proper
               ---< proposition
                              ---< rather
                                   ---< remaining
                         ---< remember
                              ---< resolve
                    ---< resting
                         ---< say
     ---< score
               ---< sense
          ---< seven
                                                  ---< shall
                                             ---< should
                                        ---< so
                                             ---< struggled
                                                       ---< take
                                                  ---< task
                                   ---< testing
                              ---< that
                         ---< the
                              ---< their
                                        ---< these
                                   ---< they
                    ---< this
                              ---< those
                                   ---< thus
                         ---< to
                                                  ---< under
                                             ---< unfinished
                                        ---< us
                                             ---< vain
                                   ---< war
                              ---< we
                                        ---< what
                                   ---< whether
                                             ---< which
                                        ---< who
                                                  ---< will
                                                       ---< work
                                             ---< world
               ---< years


G:\jslibs\bin>