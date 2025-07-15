import { LinkCardGroup, LinkCard } from "@/components/server";
import { Telegram, Youtube, Twitch, Steam, Github, Boosty, VK } from "@/components/icons";
export default function Page() {
  return (
    <div className="block">
      <h1 className="h1">Ссылки</h1>
      <div className="row gap-24 start-a center-a-self center-j wrap">
        <LinkCardGroup titleIcon={<Telegram />} title="Telegram">
          <LinkCard href="/Telegram" title="Канал" link="@nilmirktg" />
          <LinkCard href="/TelegramWatch" title="Канал с записями" link="@nilmirkwatchtg" />
        </LinkCardGroup>
        <LinkCardGroup titleIcon={<Youtube />} title="YouTube">
          <LinkCard href="/YouTube" title="Игровой канал" link="@nilmirkplay" />
          <LinkCard href="/YouTubeLive" title="Live канал" link="@nilmirklive" />
        </LinkCardGroup>
        <LinkCardGroup title="Стримы">
          <LinkCard href="/Twitch" title="Twitch канал" link="@nilmirk">
            <Twitch />
          </LinkCard>
          <LinkCard href="/VKLive" title="VKLive канал" link="@nilmirk">
            <VK />
          </LinkCard>
        </LinkCardGroup>
        <LinkCardGroup title="Другое">
          <LinkCard href="/Steam" title="Steam" link="/nilmirk">
            <Steam />
          </LinkCard>
          <LinkCard href="/GitHub" title="GitHub" link="/nilmirk">
            <Github />
          </LinkCard>
          <LinkCard href="/Boosty" title="Boosty" link="/nilmirk">
            <Boosty />
          </LinkCard>
        </LinkCardGroup>
      </div>
    </div >
  );
}