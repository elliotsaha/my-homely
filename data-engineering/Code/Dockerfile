FROM rocker/rstudio
# rstudio-stable (R version 3.5) - Use 4.03 mode updated version instead

MAINTAINER Raja "nagaraja993@gmail.com"

# Install linux Dependencies 
RUN apt-get update && apt-get install libcurl4-openssl-dev zlib1g-dev -y

# Install R packages required to run the models
RUN install2.r --error -d TRUE \
    dplyr \
    data.table \
    fastDummies \    
    stringr \
    DescTools \
    bit64 \
    vcd \
    randomForest \
    xgboost \
    gbm \ 
    splitstackshape \
    lubridate \
    e1071 \
    import \
    memisc \
    readxl \
    MASS
