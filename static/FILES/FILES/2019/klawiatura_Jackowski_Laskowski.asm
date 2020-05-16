;	LmP pn_12-14
;	Jakub Jackowski  299248
;	Łukasz Laskowski 295803

ORG	0000h
	ljmp	start

ORG	000Bh
	ljmp	keypad

ORG	0100h
start:
	mov	TMOD,#02h
	setb	ET0
	setb	EA
	setb	TR0
	mov	TL0,#0FAh
	mov	TH0,#0FAh


main:
	ljmp	main

ORG	0200h
keypad:
	mov	P0,#0F0h
	mov	r1,P0
	mov	P0,#0Fh
	mov	a,P0

	cjne	a,#0Fh,col_1
	mov	P1,#0FFh
	RETI

col_1:
	cjne	a,#07h,col_2
	mov	r0,#00h
	ljmp	rows

col_2:
	cjne	a,#0Bh,col_3
	mov	r0,#01h
	ljmp	rows

col_3:
	cjne	a,#0Dh,col_4
	mov	r0,#02h
	ljmp	rows

col_4:
	cjne	a,#0Eh,minus
	mov	r0,#03h

rows:
	mov	a,r1
	cjne	a,#0F0h,row_1
	mov	P1,#0FFh
	RETI

row_1:
	cjne	a,#70h,row_2
	ljmp	show_digit

row_2:
	cjne	a,#0B0h,row_3
	mov	a,r0
	addc	a,#04h
	mov	r0,a
	ljmp	show_digit

row_3:
	cjne	a,#0D0h,row_4
	mov	a,r0
	addc	a,#08h
	mov	r0,a
	ljmp	show_digit

row_4:
	cjne	a,#0E0h,minus
	mov	a,r0
	addc	a,#0Ch
	mov	r0,a

show_digit:
	mov	DPTR,#0400h
	mov	a,r0
	movc	a,@a+DPTR
	mov	P1,a
	RETI

minus:
	mov	P1,#0BFh
	RETI

ORG	0400h
	db  0F9h, 0A4h, 0B0h, 88h, 99h, 92h, 82h, 83h, 0F8h, 80h, 90h, 0C6h, 0A3h, 0C0h, 89h, 0A1h
	  ;  1     2     3     A    4    5    6    b    7     8    9    C     o    0     H    d

END
