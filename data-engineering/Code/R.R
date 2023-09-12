install.packages('plumber')
install.packages('randomForest')

library('randomForest')
library('plumber')

model = randomForest(Species ~ ., data = iris)
# model

save(model, file = "model.RData")

#* @apiTitle API classifcation of flowers
#* @param petal_length
#* @param petal_width
#* @param sepal_length
#* @param sepal_width
#* @post /classification

function(petal_length, petal_width, sepal_length, sepal_width){
  
  load(model.RData)
  
  test = c(sepal_length, sepal_width, petal_length, petal_width)
  test = sapply(test, as.numeric)
  test = data.frame(matrix(test, ncol = 4))
  
  colnames(test) = colnames(iris[,1:4])
  predict(model, test)
  
}
