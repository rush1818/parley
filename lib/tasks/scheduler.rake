desc "Purge stale channels"
task purge_channels: :environment do
  Channel.clean_empty_channels
  puts "clean complete"
end
