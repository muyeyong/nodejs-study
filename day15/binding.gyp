# 让node gyp知道c++入口文件
{
  "targets": [
    {
      "target_name": "test",  #nodejs require时候的名字
      "sources": ["index.cc"] #入口文件
    }
  ]
}