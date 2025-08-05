x=120
y=100
sleep 4
echo $(($x + $y))
echo "Some string" | tr " " "\n"
sleep 5

myFunc() {
    echo "something from function"
}

myFunc

# calling function with arguments
myFuncWithArguments() {
    echo $1 #here $1 means first argument and $2 means the second argument and upto $n so on
}

myFuncWithArguments "Some string from function argument"