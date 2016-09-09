desc "Purge stale channels"
task purge_channels: :environment do
  Channel.clean_empty_channels
  puts "clean complete"
end


namespace :heroku do

  # bundle exec rake heroku:reset_db['my-app-name']
  # Note: run locally with Heroku toolbelt to reset DB on app
  desc 'Reset database with seed data'
  task :reset_db, [:app_name] do |t, args|
    run_command("pg:reset DATABASE_URL --confirm #{args.app_name}")
    run_command("run rake db:migrate")
    run_command("run rake db:seed")
  end

  def run_command(cmd)
    Bundler.with_clean_env do
      sh build_command(cmd)
    end
  end

  def run_command_with_output(cmd)
    Bundler.with_clean_env do
      `#{build_command(cmd)}`
    end.gsub("\n", "")
  end

  def build_command(cmd)
    "heroku #{cmd}"
  end
end
