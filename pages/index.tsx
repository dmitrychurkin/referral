import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '@/interfaces/global';
import type { FormValues } from '@/ui/organizms/Forms/SignupNow/useValidation';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import SignupNow from '@/ui/organizms/Forms/SignupNow';

import { Routes } from '@/constants/routes';
import { useActions } from '@/features/user';
import { useUser } from '@/infrastructure/auth';
import Button, { Variants } from '@/ui/atoms/Button';
import { signout } from '@/services/user';

import Logo from 'public/logo.svg';
import AddPersonIcon from 'public/add-person.svg';
import BellIcon from 'public/bell.svg';
import MicrophoneIcon from 'public/microphone.svg';
import MicrophoneSmallIcon from 'public/microphone-small.svg';
import ThumbUpIcon from 'public/thumb-up.svg';
import ThumbUpSmallIcon from 'public/thumb-up-small.svg';
import EyeIcon from 'public/eye.svg';
import BookmarkIcon from 'public/bookmark.svg';
import Person from 'public/person.svg';

const Home: NextPageWithLayout = () => {
  const [t] = useTranslation('home');
  const router = useRouter();
  const user = useUser();
  const { change } = useActions();

  const redirectTo = (path = Routes.SIGNIN) => {
    router.push(path);
  };

  const onSignin = () => {
    redirectTo(Routes.SIGNIN);
  };

  const onSubmit = (formValues: FormValues) => {
    change(formValues);
    redirectTo();
  };

  const renderAction = () => {
    if (user) {
      return (
        <Link href={Routes.DASHBOARD}>
          <a>Dashboard</a>
        </Link>
      );
    }
    return (
      <Link href={Routes.SIGNIN}>
        <a>Log in</a>
      </Link>
    );
  };

  const dashboardAction = () => {
    if (user) {
      return (
        <Button
          onClick={signout}
          variant={Variants.ROUNDED}
          startIcon={<Person />}
          className="rounded--button"
        >
          Log out
        </Button>
      );
    }
    return (
      <Link href={Routes.EMPLOYER}>
        <a>
          <li className="btn btn--small btn--hollow">Are you an employer?</li>
        </a>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>Refer your network — Refmate </title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Refer your network. Get rewards." />
        <script dangerouslySetInnerHTML={{__html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}}/>
      </Head>
      <section className="hero">
        <header>
          <ul className="nav desktop">
            <li className="logo">
              <Logo />
            </li>
            <li><a href="#how-it-works">How it works</a></li>
            <li>
              {renderAction()}
            </li>
            <li>
              {dashboardAction()}
            </li>
          </ul>
        </header>
        <header className="nav mobile">
          <div className="menu-toggle">
            <input className="toggle" type="checkbox" />
            <label htmlFor="toggle">
              <div></div>
              <div></div>
              <div></div>
            </label>
            <ul className="menu-mobile">
              <a href="">
                <li>
                  How it works
                </li>
              </a>
              <Link href={Routes.EMPLOYER}>
                <a>
                  <li className="btn btn--small btn--hollow">
                    Are you an employer?
                  </li>
                </a>
              </Link>
            </ul>
          </div>
          <div className="logo">
            <Logo />
          </div>
          <div className="links">
            {renderAction()}
          </div>
        </header>
        <div className="hero__wrapper">
          <div className="hero__content">
            <h1>Help your peers to get a job</h1>
            <p className="hero__paragraph">Recommend your friends, colleagues or just people you know are good and looking for a job. Get a bonus as a result.</p>
            <div className="button-area">
              <button
                className="btn btn--black btn--hero"
                onClick={onSignin}
              >
                Start recommending
              </button>
            </div>
          </div>
          <div className="cards-area">
            <div className="person-card">
              <div className="card-top-row">
                <div className="profile-photo">
                  <Image src="/cameron.png" width={54} height={54} alt="cameron profile image" />
                </div>
                <div className="card-text">
                  <span className="name">Cameron Williamson</span>
                  <span className="skill">DevOps ninja</span>
                </div>
                <span className="date">3 Jan 2022</span>
              </div>
              <div className="status">
                <span className="stat">
                  <span className="stat-icon">
                    <EyeIcon 
                      viewBox="0 0 24 24"
                    />
                  </span>
                  <span>
                    22
                  </span>
                </span>
                <span className="stat">
                  <span className="stat-icon">
                    <MicrophoneSmallIcon
                      viewBox="0 0 24 24"
                    />
                  </span>
                  <span>
                    4
                  </span>
                </span>
                <span className="stat">
                  <span className="stat-icon">
                    <BookmarkIcon 
                      viewBox="0 0 24 24"
                    />
                  </span>
                  <span>
                    9
                  </span>
                </span>
              </div>
            </div>
            <div className="person-card">
              <div className="card-top-row">
                <div className="profile-photo">
                  <Image src="/brooklyn.png" width={54} height={54} alt="brooklyn profile image" />
                </div>
                <div className="card-text">
                  <span className="name">Brooklyn Simmons</span>
                  <span className="skill">Accountant</span>
                </div>
                <span className="date">18 Dec 2021</span>
              </div>
              <div className="status">
                <span className="stat">
                  <span className="stat-icon">
                    <EyeIcon 
                      viewBox="0 0 24 24"
                    />
                  </span>
                  <span>
                    17
                  </span>
                </span>
                <span className="stat">
                  <span className="stat-icon">
                    <MicrophoneSmallIcon
                      viewBox="0 0 24 24"
                    />
                  </span>
                  <span>
                    5
                  </span>
                </span>
                <span className="stat">
                  <span className="stat-icon">
                    <BookmarkIcon
                      viewBox="0 0 24 24"
                    />
                  </span>
                  <span>
                    12
                  </span>
                </span>
              </div>
            </div>
            <div className="person-card">
              <div className="card-top-row">
                <div className="profile-photo">
                  <Image src="/darlene.png" width={54} height={54} alt="darlene profile image" />
                </div>
                <div className="card-text">
                  <span className="name">Darlene Robertson</span>
                  <span className="skill">Product Designer</span>
                </div>
                <span className="date">5 Jan 2022</span>
              </div>
              <div className="status">
                <span className="stat">
                  <span className="stat-icon">
                    <EyeIcon
                      viewBox="0 0 24 24"
                    />
                  </span>
                  <span>
                    33
                  </span>
                </span>
                <span className="stat">
                  <span className="stat-icon">
                    <MicrophoneSmallIcon
                      viewBox="0 0 24 24"
                    />
                  </span>
                  <span>
                    2
                  </span>
                </span>
                <span className="stat">
                  <span className="stat-icon">
                    <BookmarkIcon
                      viewBox="0 0 24 24"
                    />
                  </span>
                  <span>
                    19
                  </span>
                </span>
                <span className="stat hired">
                  <span className="stat-icon">
                    <ThumbUpSmallIcon 
                      viewBox="0 0 24 24"
                    />
                  </span>
                  Hired
                </span>
              </div>
              <div className="additional-info">
                Hired by Startup Ltd. <span className="fake-link">Claim $3,000 reward.</span>
              </div>
            </div>
            <div className="person-card">
              <div className="card-top-row">
                <div className="profile-photo">
                  <Image src="/darlene.png" width={54} height={54} alt="darlene profile image" />
                </div>
                <div className="card-text">
                  <span className="name">Darlene Robertson</span>
                  <span className="skill">Product Designer</span>
                </div>
                <span className="date">5 Jan 2022</span>
              </div>
              <div className="status">
                <span className="stat">
                  <span className="stat-icon">
                    <EyeIcon />
                  </span>
                  <span>
                    33
                  </span>
                </span>
                <span className="stat">
                  <span className="stat-icon">
                    <MicrophoneSmallIcon />
                  </span>
                  <span>
                    2
                  </span>
                </span>
                <span className="stat">
                  <span className="stat-icon">
                    <BookmarkIcon />
                  </span>
                  <span>
                    19
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="missing-puzzle">
        <div className="missing-puzzle__wrapper">
          <div className="image-wrapper">
            <Image src="/puzzles.png" width={400} height={354} alt="puzzles" />
          </div>
          <div className="text-column">
            <div className="text-header">
              <h4 id="emerald">Why us?</h4>
              <h2 id="stress-free-header">We make looking for job stress-free</h2>
            </div>
            <div className="text-point">
              <h3>Speed and peace of mind</h3>
              <p className="paragraph-midsize">
                Hiring process is shorter and easier. Referrals are connected only with relevant offerings. The company contacting with referral is already aware of what the person is good at and already interested to work with them
              </p>
            </div>
            <div className="text-point">
              <h3>Convenience</h3>
              <p className="paragraph-midsize">
                Hiring company relies on credibility of the person who recommends and already is sure in quality of a peer.
              </p>
            </div>
            <div className="text-point">
              <h3>Reward</h3>
              <p className="paragraph-midsize">
                You help your talented friends or colleagues who search for a new job or are stuck in less than perfect working environment. Also you get a bonus for helping the hiring company find the good employee.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="solution">
        <div className="solution--wrapper">
          <div className="text-column" id="solution-column">
            <div className="text-header">
              <h4 id="purple">How is it good?</h4>
              <h2>A solution for both sides of hiring process</h2>
            </div>
            <div className="text-point" id="job-seekers-point">
              <h3>For job seekers</h3>
              <p className="paragraph-midsize">
                The hiring process remained the same for almost a century and is outdated. Candidates now prefer to communicate directly without a middle-man. They want to feel personal touch instead of the tedious, time-consuming, daunting and sometimes intimidating application screening and interviewing.
              </p>
            </div>
            <div className="text-point" id="hr-point">
              <h3>For HR and managers</h3>
              <p className="paragraph-midsize">
                Employers want to reduce the hiring cycle. They want to find reliably good team members. Preferrably with as few interviews as possible.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="how-works" id="how-it-works">
        <div className="how-works__wrapper">
          <div className="text-header">
            <h4 id="emerald">How it works</h4>
            <h2>Job seeking is easy now</h2>
          </div>
          <div className="cards-column">
            <div className="card card--grey">
              <div className="icon">
                <AddPersonIcon />
              </div>
              <h5>You recommend talented peers</h5>
              <p className="paragraph-midsize">
                You know about talented peers in your network who are searching for a new job. Highlight their strengths in a pitch.
              </p>
            </div>
            <div className="card card--grey">
              <div className="icon">
                <BellIcon />
              </div>
              <h5>We match them with employers</h5>
              <p className="paragraph-midsize">
                Matching employers get alert with brief information about candidate and you – the referrer. They immediately see if candidate fits them.
              </p>
            </div>
            <div className="card card--grey">
              <div className="icon">
                <MicrophoneIcon />
              </div>
              <h5>Candidate is being interviewed</h5>
              <p className="paragraph-midsize">
                Candidate walks through the simple interview process. Employer is already aware of the strengths and credibility of the referrer.
              </p>
            </div>
            <div className="card card--colorful">
              <div className="icon">
                <ThumbUpIcon />
              </div>
              <h5>Hired!</h5>
              <p className="paragraph-midsize">
                You have helped your peer and get a reward as a thank you from employer, who saved time and hired a great team mate.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="register-banner">
        <div className="register-banner__wrapper">
          <div className="register-banner__text">
            <h2>Help your peers get hired</h2>
            <p className="paragraph-midsize">
              If you want to recommend someone from your network either looking for a new job or in need of one, start here.
            </p>
          </div>
          <SignupNow
            t={t}
            onSubmit={onSubmit}
          />
          {/* <form id="register-form">
            <button className="btn btn--black">Recommend now</button>
          </form> */}
        </div>
      </section>
      <footer>
        © Refmate LLC, 2022
      </footer>
    </>
  )
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale as string, ['common', 'home']),
  },
})

export default Home;
