##### git问题

解决 Permission denied(publicKey) 问题 (key过期)
http://senola.github.io/blog/2014/07/13/git-error/

1.git有3个版本,每个版本都有index.html,css,js文件各一个,如果现在是在第三个版本,修改了index,网上有第四版,想合并第四版,但index文件修改过,不会自动合并,可能会冲突,那该怎么处理?
-先提交,再拉去合并,去冲突,再次提交.
2.我想把index.html 文件恢复到第二个版本,其他文件不变
--1.命令的不知道怎么操作-,命令的思路:把当前文件保存到缓存区,切换回到第二版本,把第二版的index.html提取出来,再切换到最新的工作区,把缓存区内容切换回来,替换index.html
--2.如果是使用SourceTree图形,选中第二版本的index.html,copy内容到你当前的index.html即可

2.1 查看hard
`git log`
`git log --oneline`

3.在各个版本之前切换(会删除之前的历史提交)
`git reset --hard SHA`
撤销pull `git reset --hard`
3.1 改变 HEAD 的指向 (不删除之前的历史提交,但文件可能会出现冲突之类的)
图形( 检出 )
命令: `git checkout sha` 或 创建一个新分支再切换

技巧:在分支上作业,可以先存个空白节点为无内容修改存点,为之后可以切换回来留下一个切换点

4.倒退到指定时间点指定文件
`git checkout SHA filename`

5.合并最近几个提交
`git rebase -i sha`

6.撤销
6.1 (回滚提交),创建一个新的[commit]来覆盖指定一个[commit]进行回滚(旧提交不删除,对指定[commit]反向操作) 可以针对历史中任何一个提交
`git revert sha`

6.2 git reset (重置提交) 只能从当前提交向前回溯
`git reset <commit>` 重新提交项目历史,以前的提交将存放到缓冲区
`git reset --hard` 它清除了所有未提交的更改/可以用来撤销pull,
`git reset --hard <commit>` 将当前分支的末端移到<commit>,它清除了所有未提交的更改,清除了<commit>之后的所有提交


7.合并一个提交到当前分支
`git cherry-pick [commit]`

8.显示最近几个提交的历史记录
`git reflog`
[

git reflog不会永远存在。
reflog只是你个人的。
]

使用撤销命令：`git reflog` /`git reset` [重设完全地移除了一堆更改] /`git revert` [撤销保留了原来的更改] / `git checkout`


9.`git clean` 将未跟踪的文件从你的工作目录中移除

`git clean -df` 移除未跟踪的文件，以及目录。
`git clean -xf` 移除当前目录下未跟踪的文件，以及Git一般忽略的文件。

10.重写项目历史
`git commit --amend`

`git rebase <base>`（ID、分支名、标签，或是HEAD的相对引用）

如何撤销一个合并
https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/merge-conflicts
只要在命令行界面中键入 “git merge --abort” 命令，你的合并操作就会被安全的撤销。当你解决完冲突，并且在合并完成后发现一个错误，你仍然还是有机会来简单地撤销它。你只须要键入 “git reset --hard ” 命令，系统就会回滚到那个合并开始前的状态，然后重新开始吧！

11.暂存修改
git status  // 查看修改
git stash   // 暂存
git stash list // 查看暂存列表
git stash apply xxx //恢复某个暂存（需要指定）
https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%82%A8%E8%97%8F%EF%BC%88Stashing%EF%BC%89

12.修改最后一个commit提交（最近，（往最后一个提交添加修改文件，遗留文件提交一个方法））
git commit --adxxx? 

13. 删除远程分支
git push origin --delete <branchName>

14.提取某个commit 提交合并到当前commit (当前commit 标识不变)
git cherry-pick `commitId`
