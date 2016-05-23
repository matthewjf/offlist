desc "reset DB"
task :reset_db => :environment do
  puts "resetting db"
  Rake::Task["heroku:reset_db"]
  puts "done"
end


namespace :heroku do
  desc 'Reset database with seed data'
  task :reset_db, [:app_name] do |t, args|
    run_command("pg:reset DATABASE_URL --confirm #{args.app_name}", args.app_name)
    run_command("run rake db:migrate", args.app_name)
    run_command("run rake db:seed", args.app_name)
  end

  def run_command(cmd, app_name)
    Bundler.with_clean_env do
      build_command(cmd, app_name)
    end
  end

  def run_command_with_output(cmd, app_name)
    Bundler.with_clean_env do
      `#{build_command(cmd, app_name)}`
    end.gsub("\n", "")
  end

  def build_command(cmd, app_name)
    "heroku #{cmd} --app #{app_name}"
  end
end
