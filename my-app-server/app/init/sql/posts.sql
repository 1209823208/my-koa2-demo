CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '文章作者',
  `title` text NOT NULL COMMENT '评论题目',
  `content` text NOT NULL COMMENT '评论内容',
  `uid` varchar(40) NOT NULL COMMENT '用户id',
  `moment` varchar(100) NOT NULL COMMENT '发表时间',
  `comments` varchar(200) NOT NULL DEFAULT '0' COMMENT '文章评论数',
  `pv` varchar(40) NOT NULL DEFAULT '0' COMMENT '浏览量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci