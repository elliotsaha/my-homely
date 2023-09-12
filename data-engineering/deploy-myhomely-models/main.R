library(plumber)

r <- plumb("model.R")
r$run(port=80, host="0.0.0.0")