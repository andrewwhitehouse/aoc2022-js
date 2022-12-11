const fs = require('fs')
const {solvePart1: day7Part1, solvePart2: day7Part2} = require('./day7');

function day7() {
  let day7Input = fs.readFileSync('./input/day7.txt', 'utf-8').trim()
  console.log('Day 7 Part 1', day7Part1(day7Input));
  console.log('Day 7 Part 2', day7Part2(day7Input));
}

day7();