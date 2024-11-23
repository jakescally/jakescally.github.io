---
layout: post
title:  "How I run this blog"
author: jake
categories: [ Development ]
tags: [ Blog, Development, Tutorial ]
image: assets/images/github_image.png
description: "A description for others (but primarily myself) of how I update, run, and host this blog."
featured: true
hidden: false
comments: false
---
It was such a pain figuring out how to host a blog that I could style however I wanted for free. I didn't want to do any of the "build a website" things because, frankly they look *too* fancy. Like if you a see a portfolio for some guy whose a physics major and it looks like the first default website from Squarespace, then you know he didn't *really* make it himself.

With that in mind, I found out about Github Pages. Maybe you've seen them before. They're those websites with the "username.github.io" address and they often host tutorials or personal blogs. The issue with Github Pages is that it only supports static websites. No backend whatsoever. So I wondered how so many people manage to host websites on Pages. Sure enough, most people use a tool called Jekyll.

Jekyll is a static website creator. It lets you easily put together markdown files, images, and themes/layouts created by other people into a single website. Like a folder you could have any ol browser open and navigate it like a true website (even without an internet connection of course). So basically Github just hosts a folder containing all the website files created by Jekyll and serves them to visitors.

At least that's what I thought. You don't actually dump the output "_site" folder from Jekyll to your main branch on your repo. You actually dump the *whole directory*, meaning the directory which you run the `bundle exec jekyll build` command from in the command line. For some reason I had tons of issues when just uploading the `_site` folder itself.

Once this is working, these commands are my bread and butter to get this stuff working...

Once I add a post or update something, I run `git add .` to add all updated files in the directory on my computer. Then I check it with `git status` and it should show all the files that were modified or added. Then I use `git commit` to commit it all to the main branch. Then I had issues verifying my user from the command line, so I used Github for Desktop to push to remote. And then the website updated automatically. Pretty cool!