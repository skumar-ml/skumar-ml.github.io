# frozen_string_literal: true

module Jekyll
  class LastUpdatedGenerator < Jekyll::Generator
    safe true
    priority :lowest

    def generate(site)
      site.config['last_updated'] = format_date(last_commit_date || site.time)
    end

    private

    def last_commit_date
      return unless git_available?

      timestamp = `git log -1 --format=%ct 2>/dev/null`.strip
      return if timestamp.empty?

      Time.at(timestamp.to_i).getlocal
    rescue StandardError
      nil
    end

    def git_available?
      system('git rev-parse --git-dir > /dev/null 2>&1')
    end

    def format_date(time)
      day = time.day
      suffix = ordinal_suffix(day)
      "#{time.strftime('%B')} #{day}#{suffix}, #{time.year}"
    end

    def ordinal_suffix(day)
      if (11..13).cover?(day % 100)
        'th'
      else
        case day % 10
        when 1 then 'st'
        when 2 then 'nd'
        when 3 then 'rd'
        else 'th'
        end
      end
    end
  end
end
