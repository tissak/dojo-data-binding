require 'rubygems'
require 'sinatra'

get '/data/binding.js' do
  File.read("../binding.js")
end