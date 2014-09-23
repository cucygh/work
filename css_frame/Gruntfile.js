module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n' //添加banner
			},
			compileJS : {
				files : [{
						expand : true,
						cwd : 'public', //js目录下
						src : '**/*.js', //所有js文件
						dest : 'published' //输出到此目录下
					}
				]
			},

		},
		cssmin : {
			compileCSS : {
				expand : true,
				cwd : 'public',
				src : ['**/*.css', '!**/*.min.css'],
				dest : 'published',
				ext : '.min.css'
			}
		},
		copy : {
			main : {
				files : [{
						expand : true,
						src : ['public/images/*'],
						dest : 'dest/images',
						filter : 'isFile'
					}
				]
			}
		},
		copy : {
			work : {
				files : [{
						expand : true,
						src : ['public/images/*'],
						dest : 'D:/project/ygh',
						filter : 'isFile'
					}
				]
			}
		},
		
		concat : {
			merge : {
				files : {
					'published/merge/base.js' : ['public/javascripts/jquery/jquery-1.7.2.js','public/javascripts/bootstrap/bootstrap.js','public/javascripts/gallery/base/1.0.0/base.js'],
					'published/merge/app.js' : ['public/javascripts/gallery/ajax/1.0.0/ajax.js', 'public/javascripts/app/login/1.0.0/login.js', 'public/javascripts/app/register/1.0.0/register.js'],
				}
			},
		},
		clean : {
			build : {
				src : ["published"]
			}
		}
	});

	// 加载包含 "uglify" 任务的插件。
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// 默认被执行的任务列表。
	grunt.registerTask('default', ['clean:build', 'uglify:compileJS', 'cssmin:compileCSS', 'copy:main','concat:merge']);
	grunt.registerTask('work', ['copy:work']);

};
