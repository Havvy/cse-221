#lang racket

(define (make-poly coefficients minimum-coefficient)
          (cons (vector coefficients) minimum-coefficient))

(define (print-term coefficient exponent)
  (string-append (number->string coefficient) 
                       "x" 
                       (number->string exponent)))  

(define (print-poly poly)
  (let ([copy (cdr poly)])
    null))
    
         