# Part 1

## Problem

The input is given as a list of seeds, and then a series of map definitions that
describe how to transform the seed numbers. Each line of a map defines the
destination, source, and range values for each map. The output will be the
smallest seed number after all transformations are complete.

## Solution

Loop over the list of maps. Then for each map loop over the list of seeds, and
then for each seed apply the transformation:

if the seed is between the source and the source plus the range, then remap the
seed as destination + ( seed - start ). After all the maps are applied find the
lowest value in the array.

# Part 2

## Problem

The input this time does not represent individula seeds, the numbers are pairs
that represent a range of seeds. The first number is the start, the second is
the range.

The rules for the maps are the same

## Solution

Because of this change it is not possible to "brute force" this one using the
same methods as Part 1. There are so many numbers to check that it will blow out
memory and cpu usage.

An alternative method to solving this is to instead find the ranges, or the
slices of the ranges that overlap with the map ranges and save those. By doing
this it is possible to remap an entire block of seeds at once.

There are 5 cases to account for:

1.  The case where the seed range is less than the source range. There is nothing
    to remap here.

2.  The case where the start of the source range is inside the seed range, and
    the end of the seed range is inside the source range

    s------------+-----+e seed
    | |
    s+-----+------e source

    In this case the part that needs to be remapped lies between the sourceStart
    and seedEnd

3.  The case where the entire range of seeds lies inside the range of the source.
    In this case all the seeds ranges should be remapped.

4.  The case where the start of the seed range is inside the source range, and
    the end of the source range is inside the seed range

               s+-----+-----------e  seed
                |     |

    s-----------+-----+e source

    In this case the part that needs to be remapped lies between the seedStart
    and the sourceEnd.

5.  The case where the seed range is greater than the source range. There is
    nothing to remap here

Because multiple rounds of mapping are required it is nessecary to keep the
unmapped sections and distinguish these from the already mapped sections.

This can be simplified to:

Start | Mid | End
s--------+--------------+-------e
| |
s+--------------+e

Where the start, mid, and end sections all need to be calculated as:

- start = ( seedStart ) , min( source, seedEnd ) - Covers 1,2
- mid = ( max( seedStart , source ) ) , ( min( seedEnd , sourceEnd ) ) - Covers 2,3,4
- end = ( max( sourceEnd, seedStart ), seedEnd ) - Covers 4,5

Then check if each is a valid section and keep the range in an unmapped or
mapped arrya
if start[1] > start[0] push this section to the unmapped array

if mid[1] > mid[0] remap these values using the same equation as before (seed - start) + dest
then push to the mapped array

if end[1] > end[0] push this section to the unmapped array

Repeat this for the next set of ranges for the map, using the unmapped array as
the input. Push the mapped values to a common mapped array(they do not need to
be mapped again for the current map set). And reset the unmapped array and refil
it with new unmapped sections.

Repeat again for all of the different maps from the input. Finally take the
first element of all the fully mapped ranges(these are already the minimums of
the ranges they represent) then find the minimums from them to get the output
