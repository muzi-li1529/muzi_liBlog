set -e 
# 生成静态文件 
npm run build 
# 进入生成的文件夹 
cd docs/.vuepress/dist 
git init 
git add -A 
git commit -m 'deploy' 
# 如果发布到 https://<USERNAME>.github.io/<REPO> 
git push -f git@github.com:muzi-li1529/muzi_liBlog.git master:my_pages
cd -