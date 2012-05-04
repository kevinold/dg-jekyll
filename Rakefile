task :default => :server
deploy_branch  = "master"
deploy_dir     = "_heroku" 

desc 'Clean up generated site'
task :clean do
  cleanup
end

desc 'Run js'
task :js do
  js
end

desc 'Run less'
task :less do
  less
end

desc 'Build site with Jekyll'
task :build => :clean do
  less
  system('jekyll --no-server')
  puts "build complete"
end

desc 'Start server with --auto'
task :server => :clean do
  less
  jekyll('--server --auto')
end

desc 'Build and deploy'
task :deploy => :build do
  sh 'rsync -rtzh --progress --delete _site/ ubuntu@uidev.dicomgrid.com:/home/ubuntu/marketing/'
end

desc 'Check links for site already running on localhost:4000'
task :check_links do
  begin
    require 'anemone'
    root = 'http://localhost:4000/'
    Anemone.crawl(root, :discard_page_bodies => true) do |anemone|
      anemone.after_crawl do |pagestore|
        broken_links = Hash.new { |h, k| h[k] = [] }
        pagestore.each_value do |page|
          if page.code != 200
            referrers = pagestore.pages_linking_to(page.url)
            referrers.each do |referrer|
              broken_links[referrer] << page
            end
          end
        end
        broken_links.each do |referrer, pages|
          puts "#{referrer.url} contains the following broken links:"
          pages.each do |page|
            puts "  HTTP #{page.code} #{page.url}"
          end
        end
      end
    end

  rescue LoadError
    abort 'Install anemone gem: gem install anemone'
  end
end

def cleanup
  sh 'rm -rf _site'
end

def jekyll(opts = '')
  sh 'jekyll ' + opts
end

def less(opts = '')
  Dir::mkdir('css') unless File.directory?('css')
  sh 'lessc _less/styles.less > css/styles.css -compress'
end

def js(opts = '')
  Dir::mkdir('js') unless File.directory?('js')
  sh 'cat js/jquery.js js/bootstrap*.js | uglifyjs -o js/scripts.min.js'
  sh 'uglifyjs -o js/application.min.js js/application.js'
end

desc "deploy basic rack app to heroku"
multitask :heroku do
  puts "## Deploying to Heroku "
  (Dir["#{deploy_dir}/public/*"]).each { |f| rm_rf(f) }
  system "cp -R _site/* #{deploy_dir}/public"
  puts "\n## copying _site to #{deploy_dir}/public"
  cd "#{deploy_dir}" do
    system "git add ."
    system "git add -u"
    puts "\n## Committing: Site updated at #{Time.now.utc}"
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m '#{message}'"
    puts "\n## Pushing generated #{deploy_dir} website"
    system "git push heroku #{deploy_branch}"
    puts "\n## Heroku deploy complete"
  end
end
